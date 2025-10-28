from __future__ import annotations

import csv
from io import StringIO
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.db.database import get_db
from app.db.models import ActivityEvent, Emission, User
from app.utils.time import parse_dt

router = APIRouter(prefix="/v1/reports", tags=["reports"])


def stream_csv(rows):
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow([
        "emission_id",
        "event_id",
        "occurred_at",
        "category",
        "unit",
        "value_numeric",
        "scope",
        "co2e_kg",
    ])
    yield buffer.getvalue()
    buffer.seek(0)
    buffer.truncate(0)
    for em, ev in rows:
        writer.writerow([
            em.id,
            ev.id,
            ev.occurred_at.isoformat(),
            ev.category,
            ev.unit,
            float(ev.value_numeric),
            em.scope,
            float(em.co2e_kg),
        ])
        yield buffer.getvalue()
        buffer.seek(0)
        buffer.truncate(0)


@router.get(
    "/period",
    responses={
        200: {
            "description": "CSV stream of emissions for a period",
            "content": {
                "text/csv": {
                    "example": "emission_id,event_id,occurred_at,category,unit,value_numeric,scope,co2e_kg\n1,10,2024-01-01T00:00:00Z,Electricity,kWh,100,2,23.3\n"
                }
            },
        }
    },
)
def report_period(from_: str = Query(alias="from"), to: str = Query(), db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None):
    start = parse_dt(from_)
    end = parse_dt(to)
    if end <= start:
        raise HTTPException(status_code=400, detail="to must be after from")

    stmt = (
        select(Emission, ActivityEvent)
        .join(ActivityEvent, ActivityEvent.id == Emission.event_id)
        .where(Emission.org_id == user.org_id)
        .where(ActivityEvent.occurred_at >= start)
        .where(ActivityEvent.occurred_at < end)
        .order_by(ActivityEvent.occurred_at)
    )
    rows = db.execute(stmt)

    headers = {
        "Content-Disposition": f"attachment; filename=emissions_{start.date()}_{end.date()}.csv"
    }
    return StreamingResponse(stream_csv(rows), media_type="text/csv", headers=headers)
