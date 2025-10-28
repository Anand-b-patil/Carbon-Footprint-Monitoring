from __future__ import annotations

from io import StringIO
from typing import Annotated

import pandas as pd
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.db.database import get_db
from app.db.models import ActivityEvent, User
from app.services.ingestion.hash_utils import stable_event_hash
from app.services.calc.worker_stub import recalculate_for_events
from app.utils.time import parse_dt

router = APIRouter(prefix="/v1/ingest", tags=["ingest"])


class UploadResponse(BaseModel):
    created_events: int
    skipped_duplicates: int
    created_emissions: int

    model_config = {
        "json_schema_extra": {
            "examples": [
                {"created_events": 100, "skipped_duplicates": 5, "created_emissions": 100}
            ]
        }
    }


@router.post(
    "/upload-csv",
    response_model=UploadResponse,
    dependencies=[Depends(require_role("analyst", "admin"))],
    responses={
        200: {
            "description": "Bulk CSV upload of activity events",
            "content": {"application/json": {"example": {"created_events": 100, "skipped_duplicates": 5, "created_emissions": 100}}},
        }
    },
)
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only CSV files are accepted")
    data = await file.read()
    try:
        df = pd.read_csv(StringIO(data.decode("utf-8")))
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid CSV format") from exc

    required_cols = {"occurred_at", "category", "unit", "value_numeric"}
    if not required_cols.issubset(set(df.columns)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing required columns: occurred_at, category, unit, value_numeric")

    created_ids: list[int] = []
    skipped = 0

    for _, row in df.iterrows():
        try:
            occurred_at = parse_dt(str(row["occurred_at"]))
            category = str(row["category"])[:100]
            unit = str(row["unit"])[:50]
            value_numeric = float(row["value_numeric"])  # type: ignore[arg-type]
            if value_numeric < 0:
                raise ValueError("value_numeric must be non-negative")
        except Exception:
            # Skip invalid rows silently for MVP
            continue

        data_for_hash = {
            "org_id": user.org_id,
            "facility_id": 0,
            "occurred_at": occurred_at.isoformat(),
            "category": category,
            "unit": unit,
            "value_numeric": value_numeric,
        }
        event_hash = stable_event_hash(data_for_hash)
        ev = ActivityEvent(
            org_id=user.org_id,
            facility_id=None,
            source_id=None,
            occurred_at=occurred_at,
            category=category,
            subcategory=None,
            unit=unit,
            value_numeric=value_numeric,
            currency=None,
            spend_value=None,
            raw_payload_json=None,
            extracted_fields_json=None,
            scope_hint=None,
            hash_dedupe=event_hash,
        )
        db.add(ev)
        try:
            db.flush()
            created_ids.append(ev.id)
        except Exception:
            db.rollback()
            skipped += 1

    created_emissions = recalculate_for_events(db, org_id=user.org_id, event_ids=created_ids)
    return UploadResponse(created_events=len(created_ids), skipped_duplicates=skipped, created_emissions=created_emissions)
