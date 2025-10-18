from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models import Emission, ActivityEvent


def kpis(db: Session, *, org_id: int, date_from: datetime, date_to: datetime) -> dict[str, Any]:
    total = db.scalar(
        select(func.coalesce(func.sum(Emission.co2e_kg), 0)).where(
            Emission.org_id == org_id, Emission.created_at >= date_from, Emission.created_at < date_to
        )
    )
    scope1 = db.scalar(select(func.coalesce(func.sum(Emission.co2e_kg), 0)).where(Emission.org_id == org_id, Emission.scope == "1"))
    scope2 = db.scalar(select(func.coalesce(func.sum(Emission.co2e_kg), 0)).where(Emission.org_id == org_id, Emission.scope == "2"))
    scope3 = db.scalar(select(func.coalesce(func.sum(Emission.co2e_kg), 0)).where(Emission.org_id == org_id, Emission.scope == "3"))
    return {
        "total_co2e_kg": float(total or 0),
        "scope1_kg": float(scope1 or 0),
        "scope2_kg": float(scope2 or 0),
        "scope3_kg": float(scope3 or 0),
    }


def last_event_time(db: Session, *, org_id: int) -> datetime | None:
    return db.scalar(select(func.max(ActivityEvent.occurred_at)).where(ActivityEvent.org_id == org_id))
