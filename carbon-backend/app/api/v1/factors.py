from __future__ import annotations

from datetime import datetime
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import and_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.db.database import get_db
from app.db.models import EmissionFactor, User
from app.services.calc.worker_stub import select_best_factor
from app.utils.time import parse_dt

router = APIRouter(prefix="/v1/factors", tags=["factors"])


class FactorCreate(BaseModel):
    namespace: str = Field(default="global", max_length=50)
    category: str = Field(min_length=1, max_length=100)
    unit_in: str = Field(min_length=1, max_length=50)
    unit_out: str = Field(min_length=1, max_length=50)
    factor_value: float = Field(ge=0)
    gwp_horizon: int = 100
    geography: str = Field(default="GLOBAL", max_length=50)
    vendor: str = Field(min_length=1, max_length=50)
    method: str = Field(min_length=1, max_length=50)
    valid_from: str
    valid_to: str
    version: int = 1


class FactorOut(BaseModel):
    id: int
    namespace: str
    category: str
    unit_in: str
    unit_out: str
    factor_value: float
    gwp_horizon: int
    geography: str
    vendor: str
    method: str
    valid_from: datetime
    valid_to: datetime
    version: int


@router.post("", response_model=FactorOut, status_code=201, dependencies=[Depends(require_role("admin"))])
def create_factor(payload: FactorCreate, db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("admin"))] = None):
    vf = parse_dt(payload.valid_from)
    vt = parse_dt(payload.valid_to)
    if vt <= vf:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="valid_to must be after valid_from")
    row = EmissionFactor(
        namespace=payload.namespace,
        category=payload.category,
        unit_in=payload.unit_in,
        unit_out=payload.unit_out,
        factor_value=payload.factor_value,
        gwp_horizon=payload.gwp_horizon,
        geography=payload.geography,
        vendor=payload.vendor,
        method=payload.method,
        valid_from=vf,
        valid_to=vt,
        version=payload.version,
    )
    db.add(row)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Factor already exists for given keys")
    return FactorOut(
        id=row.id,
        namespace=row.namespace,
        category=row.category,
        unit_in=row.unit_in,
        unit_out=row.unit_out,
        factor_value=float(row.factor_value),
        gwp_horizon=int(row.gwp_horizon),
        geography=row.geography,
        vendor=row.vendor,
        method=row.method,
        valid_from=row.valid_from,
        valid_to=row.valid_to,
        version=int(row.version),
    )


@router.get("", response_model=list[FactorOut])
def list_factors(
    db: Session = Depends(get_db),
    _: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None,
    category: Optional[str] = Query(default=None),
    geography: Optional[str] = Query(default=None),
    valid_on: Optional[str] = Query(default=None),
):
    stmt = select(EmissionFactor)
    conditions = []
    if category:
        conditions.append(EmissionFactor.category == category)
    if geography:
        conditions.append(EmissionFactor.geography == geography)
    if valid_on:
        ts = parse_dt(valid_on)
        conditions.append(and_(EmissionFactor.valid_from <= ts, EmissionFactor.valid_to >= ts))
    if conditions:
        stmt = stmt.where(and_(*conditions))
    stmt = stmt.order_by(EmissionFactor.category, EmissionFactor.geography, EmissionFactor.version.desc())
    rows = list(db.scalars(stmt))
    return [
        FactorOut(
            id=r.id,
            namespace=r.namespace,
            category=r.category,
            unit_in=r.unit_in,
            unit_out=r.unit_out,
            factor_value=float(r.factor_value),
            gwp_horizon=int(r.gwp_horizon),
            geography=r.geography,
            vendor=r.vendor,
            method=r.method,
            valid_from=r.valid_from,
            valid_to=r.valid_to,
            version=int(r.version),
        )
        for r in rows
    ]


class PreviewQuery(BaseModel):
    category: str
    occurred_at: str
    geography: Optional[str] = None


class PreviewOut(BaseModel):
    id: int
    category: str
    geography: str
    version: int
    factor_value: float


@router.get("/preview", response_model=PreviewOut)
def preview(category: str, occurred_at: str, geography: Optional[str] = None, db: Session = Depends(get_db), _: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None):
    ts = parse_dt(occurred_at)
    fac = select_best_factor(db, category=category, occurred_at=ts, geography=geography)
    if not fac:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No factor matches criteria")
    return PreviewOut(id=fac.id, category=fac.category, geography=fac.geography, version=int(fac.version), factor_value=float(fac.factor_value))
