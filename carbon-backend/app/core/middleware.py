import time
import uuid
from typing import Callable

from fastapi import Request, Response


async def request_context_middleware(request: Request, call_next: Callable):
    start = time.perf_counter()
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    try:
        response: Response = await call_next(request)
    finally:
        duration_ms = int((time.perf_counter() - start) * 1000)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time-ms"] = str(duration_ms)
    return response
