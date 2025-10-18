from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import BigInteger, Boolean, CheckConstraint, DateTime, Enum, ForeignKey, String, UniqueConstraint, JSON, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    plan: Mapped[str] = mapped_column(String(50), default="free", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    users: Mapped[list["User"]] = relationship(back_populates="org")
    facilities: Mapped[list["Facility"]] = relationship(back_populates="org")


class UserRoleEnum(str):
    admin = "admin"
    analyst = "analyst"
    viewer = "viewer"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default=UserRoleEnum.viewer)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    org: Mapped[Organization] = relationship(back_populates="users")

    __table_args__ = (
        UniqueConstraint("org_id", "email", name="uq_users_org_email"),
    )


class Facility(Base):
    __tablename__ = "facilities"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    country: Mapped[Optional[str]] = mapped_column(String(2), nullable=True)
    grid_region: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    org: Mapped[Organization] = relationship(back_populates="facilities")

    __table_args__ = (
        UniqueConstraint("org_id", "name", name="uq_facilities_org_name"),
    )


class ActivityEvent(Base):
    __tablename__ = "activity_events"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    facility_id: Mapped[Optional[int]] = mapped_column(ForeignKey("facilities.id", ondelete="SET NULL"), nullable=True)
    source_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    subcategory: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    unit: Mapped[str] = mapped_column(String(50), nullable=False)
    value_numeric: Mapped[float] = mapped_column(Numeric(18, 6), nullable=False)
    currency: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    spend_value: Mapped[Optional[float]] = mapped_column(Numeric(18, 6), nullable=True)
    raw_payload_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    extracted_fields_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    scope_hint: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    hash_dedupe: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("org_id", "hash_dedupe", name="uq_events_org_hash"),
        CheckConstraint("value_numeric >= 0", name="ck_events_value_nonneg"),
    )


class EmissionFactor(Base):
    __tablename__ = "emission_factors"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    namespace: Mapped[str] = mapped_column(String(50), nullable=False, default="global")
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    unit_in: Mapped[str] = mapped_column(String(50), nullable=False)
    unit_out: Mapped[str] = mapped_column(String(50), nullable=False)
    factor_value: Mapped[float] = mapped_column(Numeric(18, 6), nullable=False)
    gwp_horizon: Mapped[int] = mapped_column(BigInteger, nullable=False, default=100)
    geography: Mapped[str] = mapped_column(String(50), nullable=False, default="GLOBAL")
    vendor: Mapped[str] = mapped_column(String(50), nullable=False)
    method: Mapped[str] = mapped_column(String(50), nullable=False)
    valid_from: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_to: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    version: Mapped[int] = mapped_column(BigInteger, nullable=False, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)


class Emission(Base):
    __tablename__ = "emissions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    org_id: Mapped[int] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("activity_events.id", ondelete="CASCADE"), nullable=False, index=True)
    factor_id: Mapped[int] = mapped_column(ForeignKey("emission_factors.id", ondelete="RESTRICT"), nullable=False)
    scope: Mapped[str] = mapped_column(String(5), nullable=False)
    co2e_kg: Mapped[float] = mapped_column(Numeric(18, 6), nullable=False)
    calc_version: Mapped[str] = mapped_column(String(20), nullable=False, default="v1")
    uncertainty_pct: Mapped[Optional[float]] = mapped_column(Numeric(5, 2), nullable=True)
    provenance_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("org_id", "event_id", name="uq_emissions_org_event"),
    )
