from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.core.auth import get_current_user
from app.db.database import get_db
from app.db.models import Organization, User

router = APIRouter(prefix="/v1/auth", tags=["auth"])


class SignupRequest(BaseModel):
    org_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class MeResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    org: dict


@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    # Create org if not exists
    existing_org = db.scalar(select(Organization).where(Organization.name == payload.org_name))
    if existing_org:
        # If org exists, disallow if there is already an admin; otherwise allow additional admin signup?
        # For MVP: allow if email does not exist in that org
        org = existing_org
    else:
        org = Organization(name=payload.org_name, plan="free")
        db.add(org)
        db.flush()
    # Ensure email unique within org
    existing_user = db.scalar(select(User).where(User.org_id == org.id, User.email == payload.email))
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    user = User(org_id=org.id, email=payload.email, password_hash=hash_password(payload.password), role="admin", is_active=True)
    db.add(user)
    db.flush()
    token = create_access_token(str(user.id), {"org_id": org.id, "role": user.role})
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(str(user.id), {"org_id": user.org_id, "role": user.role})
    return TokenResponse(access_token=token)


@router.get("/me", response_model=MeResponse)
def me(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    org = db.get(Organization, current_user.org_id)
    return MeResponse(id=current_user.id, email=current_user.email, role=current_user.role, org={"id": org.id, "name": org.name, "plan": org.plan})
