import hashlib
from typing import Any


def stable_event_hash(payload: dict[str, Any]) -> str:
    # Use sorted keys to generate stable hash
    normalized = []
    for key in sorted(payload.keys()):
        normalized.append(f"{key}={payload[key]}")
    joined = "|".join(normalized)
    return hashlib.sha256(joined.encode("utf-8")).hexdigest()
