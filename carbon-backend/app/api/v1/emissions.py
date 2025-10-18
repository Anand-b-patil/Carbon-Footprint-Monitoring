from __future__ import annotations

from datetime import datetime
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.db.database import get_db
from app.db.models import ActivityEvent, Emission, User
from app.services.calc.worker_stub import recalculate_for_events
from app.utils.time import parse_dt

router = APIRouter(prefix="/v1/emissions", tags=["emissions"])


class EmissionOut(BaseModel):
    id: int
    event_id: int
    factor_id: int
    scope: str
    co2e_kg: float
    occurred_at: datetime
    category: str


@router.get("", response_model=list[EmissionOut])
def list_emissions(
    db: Session = Depends(get_db),
    user: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None,
    from_: Optional[str] = Query(default=None, alias="from"),
    to: Optional[str] = Query(default=None),
    limit: int = Query(default=100, ge=1, le=1000),
    offset: int = Query(default=0, ge=0),
):
    # Filter by event occurred_at
    stmt = (
        select(Emission, ActivityEvent)
        .join(ActivityEvent, ActivityEvent.id == Emission.event_id)
        .where(Emission.org_id == user.org_id)
        .order_by(ActivityEvent.occurred_at.desc())
        .limit(limit)
        .offset(offset)
    )
    if from_:
        frm = parse_dt(from_)
        stmt = stmt.where(ActivityEvent.occurred_at >= frm)
    if to:
        to_dt = parse_dt(to)
        stmt = stmt.where(ActivityEvent.occurred_at < to_dt)

    rows = list(db.execute(stmt))
    out: list[EmissionOut] = []
    for em, ev in rows:
        out.append(
            EmissionOut(
                id=em.id,
                event_id=em.event_id,
                factor_id=em.factor_id,
                scope=em.scope,
                co2e_kg=float(em.co2e_kg),
                occurred_at=ev.occurred_at,
                category=ev.category,
            )
        )
    return out


class RecomputeRequest(BaseModel):
    since: Optional[str] = Field(default=None)
    until: Optional[str] = Field(default=None)


class RecomputeResponse(BaseModel):
    recalculated_events: int


@router.post("/recompute", response_model=RecomputeResponse, dependencies=[Depends(require_role("admin"))])
def recompute(payload: RecomputeRequest, db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("admin"))] = None):
    stmt = select(ActivityEvent.id).where(ActivityEvent.org_id == user.org_id)
    if payload.since:
        since_dt = parse_dt(payload.since)
        stmt = stmt.where(ActivityEvent.occurred_at >= since_dt)
    if payload.until:
        until_dt = parse_dt(payload.until)
        stmt = stmt.where(ActivityEvent.occurred_at < until_dt)
    event_ids = list(db.scalars(stmt))
    count = recalculate_for_events(db, org_id=user.org_id, event_ids=list(event_ids))
    return RecomputeResponse(recalculated_events=count)
