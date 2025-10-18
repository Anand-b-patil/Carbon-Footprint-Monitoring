from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def test_full_flow(monkeypatch):
    # The app requires a real database connection string in env; this test assumes DB and migrations are ready.
    # 1) Signup
    r = client.post("/v1/auth/signup", json={"org_name": "Acme Corp", "email": "admin@acme.test", "password": "Secret123!"})
    assert r.status_code == 200, r.text
    token = r.json()["access_token"]

    # 2) Me
    r = client.get("/v1/auth/me", headers=auth_headers(token))
    assert r.status_code == 200
    me = r.json()
    assert me["org"]["name"] == "Acme Corp"

    # 3) Create facility
    r = client.post(
        "/v1/tenants/facilities",
        headers=auth_headers(token),
        json={"name": "HQ", "country": "IN", "grid_region": "IN-N"},
    )
    assert r.status_code == 201, r.text
    fac_id = r.json()["id"]

    # 4) Ingest two events
    events = [
        {"occurred_at": "2024-02-01T00:00:00Z", "category": "electricity.kwh", "unit": "kWh", "value_numeric": 100, "facility_id": fac_id},
        {"occurred_at": "2024-02-02T00:00:00Z", "category": "diesel.litre", "unit": "l", "value_numeric": 10, "facility_id": fac_id},
    ]
    r = client.post("/v1/ingest/events", headers=auth_headers(token), json={"events": events})
    assert r.status_code == 200, r.text
    out = r.json()
    assert out["created_events"] >= 2
    assert out["created_emissions"] >= 2

    # 5) KPIs
    r = client.get(
        "/v1/analytics/kpis",
        headers=auth_headers(token),
        params={"from": "2024-01-01T00:00:00Z", "to": "2025-01-01T00:00:00Z"},
    )
    assert r.status_code == 200, r.text
    k = r.json()
    assert k["total_co2e_kg"] > 0
    assert abs(k["total_co2e_kg"] - (k["scope1_kg"] + k["scope2_kg"] + k["scope3_kg"])) < 1e-6
