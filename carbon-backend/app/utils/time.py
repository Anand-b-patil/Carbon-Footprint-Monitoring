from __future__ import annotations

from datetime import datetime, timezone
from dateutil import parser


def parse_dt(value: str) -> datetime:
    dt = parser.isoparse(value)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)
