from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import ActivityEvent, Emission, EmissionFactor


def infer_scope(category: str) -> str:
    c = category.lower()
    if "fuel" in c or "diesel" in c or "petrol" in c:
        return "1"
    if "electric" in c or "kwh" in c:
        return "2"
    return "3"


def select_best_factor(db: Session, *, category: str, occurred_at: datetime, geography: Optional[str]) -> Optional[EmissionFactor]:
    stmt = (
        select(EmissionFactor)
        .where(EmissionFactor.category == category)
        .where(EmissionFactor.valid_from <= occurred_at)
        .where(EmissionFactor.valid_to >= occurred_at)
    )
    factors = list(db.scalars(stmt))
    if geography:
        geo_matched = [f for f in factors if f.geography.upper() == geography.upper()]
    else:
        geo_matched = []
    global_matched = [f for f in factors if f.geography.upper() == "GLOBAL"]
    candidates = geo_matched or global_matched
    if not candidates:
        return None
    # pick highest version, then latest valid_from
    candidates.sort(key=lambda f: (f.version, f.valid_from), reverse=True)
    return candidates[0]


def calculate_emission_for_event(db: Session, *, org_id: int, event: ActivityEvent) -> Optional[Emission]:
    factor = select_best_factor(db, category=event.category, occurred_at=event.occurred_at, geography=None)
    if not factor:
        return None
    co2e_kg = float(event.value_numeric) * float(factor.factor_value)
    emission = Emission(
        org_id=org_id,
        event_id=event.id,
        factor_id=factor.id,
        scope=event.scope_hint or infer_scope(event.category),
        co2e_kg=co2e_kg,
        calc_version="v1",
        uncertainty_pct=None,
        provenance_json={
            "formula": "value * factor_value",
            "factor_version": factor.version,
            "geography": factor.geography,
            "method": factor.method,
        },
    )
    db.add(emission)
    return emission


def recalculate_for_events(db: Session, *, org_id: int, event_ids: list[int]) -> int:
    if not event_ids:
        return 0
    deleted = db.query(Emission).filter(Emission.org_id == org_id, Emission.event_id.in_(event_ids)).delete(synchronize_session=False)
    # re-create
    events = list(db.scalars(select(ActivityEvent).where(ActivityEvent.org_id == org_id, ActivityEvent.id.in_(event_ids))))
    created = 0
    for ev in events:
        em = calculate_emission_for_event(db, org_id=org_id, event=ev)
        if em:
            created += 1
    return created
