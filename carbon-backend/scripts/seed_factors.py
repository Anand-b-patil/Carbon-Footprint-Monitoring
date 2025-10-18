from __future__ import annotations

from datetime import datetime

from sqlalchemy import create_engine, text

from app.core.config import settings

DATA = [
    ("global", "electricity.kwh", "kWh", "kgCO2e", "0.70", 100, "IN", "grid", "activity", "2024-01-01", "2026-01-01", 1),
    ("global", "diesel.litre", "l", "kgCO2e", "2.680", 100, "GLOBAL", "ipcc", "activity", "2020-01-01", "2026-01-01", 1),
    ("global", "petrol.litre", "l", "kgCO2e", "2.310", 100, "GLOBAL", "ipcc", "activity", "2020-01-01", "2026-01-01", 1),
    ("global", "air.travel.km.short", "km", "kgCO2e", "0.158", 100, "GLOBAL", "defra", "activity", "2024-01-01", "2026-01-01", 1),
    ("global", "spend.generic.inr", "INR", "kgCO2e", "0.00045", 100, "IN", "eeio", "spend", "2024-01-01", "2026-01-01", 1),
]


def main() -> None:
    engine = create_engine(settings.database_url, future=True)
    with engine.begin() as conn:
        for row in DATA:
            namespace, category, unit_in, unit_out, factor_value, gwp, geography, vendor, method, valid_from, valid_to, version = row
            stmt = text(
                """
                INSERT INTO emission_factors (namespace, category, unit_in, unit_out, factor_value, gwp_horizon, geography, vendor, method, valid_from, valid_to, version, created_at, updated_at)
                VALUES (:namespace, :category, :unit_in, :unit_out, :factor_value, :gwp_horizon, :geography, :vendor, :method, :valid_from, :valid_to, :version, NOW(), NOW())
                ON CONFLICT DO NOTHING
                """
            )
            conn.execute(
                stmt,
                {
                    "namespace": namespace,
                    "category": category,
                    "unit_in": unit_in,
                    "unit_out": unit_out,
                    "factor_value": factor_value,
                    "gwp_horizon": gwp,
                    "geography": geography,
                    "vendor": vendor,
                    "method": method,
                    "valid_from": valid_from,
                    "valid_to": valid_to,
                    "version": version,
                },
            )
    print("Seeded emission_factors (idempotent)")


if __name__ == "__main__":
    main()
