# Carbon Footprint Monitoring API

FastAPI backend for multi-tenant carbon accounting.

## Local run

```bash
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
pip install -e .
pip install fastapi "uvicorn[standard]" "SQLAlchemy>=2.0" psycopg2-binary alembic \
            "pydantic>=2.0" pydantic-settings python-multipart redis celery pandas \
            "passlib[bcrypt]" "python-jose[cryptography]" python-dateutil pytest

# .env must define DATABASE_URL
alembic upgrade head
python scripts/seed_factors.py
uvicorn app.main:app --reload
pytest -q
```

## Health

GET `/health` → `{ "status": "ok" }`
