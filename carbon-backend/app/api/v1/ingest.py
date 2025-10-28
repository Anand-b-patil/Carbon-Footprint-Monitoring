from __future__ import annotations

from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, field_validator
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.db.database import get_db
from app.db.models import ActivityEvent, User
from app.services.ingestion.hash_utils import stable_event_hash
from app.services.calc.worker_stub import recalculate_for_events
from app.utils.time import parse_dt

router = APIRouter(prefix="/v1/ingest", tags=["ingest"])


class EventIn(BaseModel):
    occurred_at: str
    category: str = Field(min_length=1, max_length=100)
    unit: str = Field(min_length=1, max_length=50)
    value_numeric: float = Field(ge=0)
    facility_id: Optional[int] = None
    source_id: Optional[str] = None
    subcategory: Optional[str] = None
    currency: Optional[str] = None
    spend_value: Optional[float] = Field(default=None, ge=0)

    @field_validator("occurred_at")
    @classmethod
    def validate_occurred_at(cls, v: str) -> str:
        try:
            parse_dt(v)
        except Exception as exc:
            raise ValueError("occurred_at must be ISO-8601 datetime") from exc
        return v


class IngestRequest(BaseModel):
    events: list[EventIn]


class IngestResponse(BaseModel):
    created_events: int
    skipped_duplicates: int
    created_emissions: int

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "created_events": 10,
                    "skipped_duplicates": 2,
                    "created_emissions": 10,
                }
            ]
        }
    }


@router.post(
    "/events",
    response_model=IngestResponse,
    dependencies=[Depends(require_role("analyst", "admin"))],
    responses={
        200: {
            "description": "Ingest activity events",
            "content": {
                "application/json": {
                    "example": {"created_events": 10, "skipped_duplicates": 2, "created_emissions": 10}
                }
            },
        }
    },
)
def ingest_events(payload: IngestRequest, db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None):
    if not payload.events:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No events provided")
    created_ids: list[int] = []
    skipped = 0

    for ev in payload.events:
        occurred_at = parse_dt(ev.occurred_at)
        data_for_hash = {
            "org_id": user.org_id,
            "facility_id": ev.facility_id or 0,
            "occurred_at": occurred_at.isoformat(),
            "category": ev.category,
            "unit": ev.unit,
            "value_numeric": ev.value_numeric,
        }
        event_hash = stable_event_hash(data_for_hash)
        row = ActivityEvent(
            org_id=user.org_id,
            facility_id=ev.facility_id,
            source_id=ev.source_id,
            occurred_at=occurred_at,
            category=ev.category,
            subcategory=ev.subcategory,
            unit=ev.unit,
            value_numeric=ev.value_numeric,
            currency=ev.currency,
            spend_value=ev.spend_value,
            raw_payload_json=None,
            extracted_fields_json=None,
            scope_hint=None,
            hash_dedupe=event_hash,
        )
        db.add(row)
        try:
            db.flush()
            created_ids.append(row.id)
        except IntegrityError:
            db.rollback()
            # Fetch existing to get its id? Not necessary for calc; skip duplicates
            skipped += 1

    created_emissions = recalculate_for_events(db, org_id=user.org_id, event_ids=created_ids)
    return IngestResponse(created_events=len(created_ids), skipped_duplicates=skipped, created_emissions=created_emissions)
