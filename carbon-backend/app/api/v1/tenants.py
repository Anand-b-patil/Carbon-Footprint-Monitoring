from __future__ import annotations

from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.auth import require_role
from app.core.security import hash_password
from app.db.database import get_db
from app.db.models import Facility, User

router = APIRouter(prefix="/v1/tenants", tags=["tenants"])


class FacilityCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    country: Optional[str] = Field(default=None, max_length=2)
    grid_region: Optional[str] = Field(default=None, max_length=50)


class FacilityOut(BaseModel):
    id: int
    name: str
    country: Optional[str]
    grid_region: Optional[str]


@router.post("/facilities", response_model=FacilityOut, status_code=201, dependencies=[Depends(require_role("admin"))])
def create_facility(payload: FacilityCreate, db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("admin"))] = None):
    facility = Facility(org_id=user.org_id, name=payload.name, country=payload.country, grid_region=payload.grid_region)
    db.add(facility)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Facility name already exists")
    return FacilityOut(id=facility.id, name=facility.name, country=facility.country, grid_region=facility.grid_region)


@router.get("/facilities", response_model=list[FacilityOut])
def list_facilities(db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("viewer", "analyst", "admin"))] = None):
    rows = list(db.scalars(select(Facility).where(Facility.org_id == user.org_id).order_by(Facility.name)))
    return [FacilityOut(id=f.id, name=f.name, country=f.country, grid_region=f.grid_region) for f in rows]


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    role: str = Field(pattern="^(admin|analyst|viewer)$")


class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str
    is_active: bool


@router.post("/users", response_model=UserOut, status_code=201, dependencies=[Depends(require_role("admin"))])
def create_user(payload: UserCreate, db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("admin"))] = None):
    new_user = User(org_id=user.org_id, email=payload.email, password_hash=hash_password(payload.password), role=payload.role, is_active=True)
    db.add(new_user)
    try:
        db.flush()
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User email already exists")
    return UserOut(id=new_user.id, email=new_user.email, role=new_user.role, is_active=new_user.is_active)


@router.get("/users", response_model=list[UserOut], dependencies=[Depends(require_role("admin"))])
def list_users(db: Session = Depends(get_db), user: Annotated[User, Depends(require_role("admin"))] = None):
    rows = list(db.scalars(select(User).where(User.org_id == user.org_id).order_by(User.email)))
    return [UserOut(id=u.id, email=u.email, role=u.role, is_active=u.is_active) for u in rows]
