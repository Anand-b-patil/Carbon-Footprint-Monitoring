from __future__ import annotations

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0002_events_factors_emissions"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "activity_events",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("org_id", sa.BigInteger(), sa.ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False),
        sa.Column("facility_id", sa.BigInteger(), sa.ForeignKey("facilities.id", ondelete="SET NULL"), nullable=True),
        sa.Column("source_id", sa.String(length=100), nullable=True),
        sa.Column("occurred_at", sa.DateTime(), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("subcategory", sa.String(length=100), nullable=True),
        sa.Column("unit", sa.String(length=50), nullable=False),
        sa.Column("value_numeric", sa.Numeric(18, 6), nullable=False),
        sa.Column("currency", sa.String(length=10), nullable=True),
        sa.Column("spend_value", sa.Numeric(18, 6), nullable=True),
        sa.Column("raw_payload_json", sa.JSON(), nullable=True),
        sa.Column("extracted_fields_json", sa.JSON(), nullable=True),
        sa.Column("scope_hint", sa.String(length=10), nullable=True),
        sa.Column("hash_dedupe", sa.String(length=64), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.CheckConstraint("value_numeric >= 0", name="ck_events_value_nonneg"),
    )
    op.create_index("ix_events_org_id", "activity_events", ["org_id"], unique=False)
    op.create_index("ix_events_occurred_at", "activity_events", ["occurred_at"], unique=False)
    op.create_index("ix_events_category", "activity_events", ["category"], unique=False)
    op.create_unique_constraint("uq_events_org_hash", "activity_events", ["org_id", "hash_dedupe"])

    op.create_table(
        "emission_factors",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("namespace", sa.String(length=50), nullable=False, server_default="global"),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("unit_in", sa.String(length=50), nullable=False),
        sa.Column("unit_out", sa.String(length=50), nullable=False),
        sa.Column("factor_value", sa.Numeric(18, 6), nullable=False),
        sa.Column("gwp_horizon", sa.BigInteger(), nullable=False, server_default="100"),
        sa.Column("geography", sa.String(length=50), nullable=False, server_default="GLOBAL"),
        sa.Column("vendor", sa.String(length=50), nullable=False),
        sa.Column("method", sa.String(length=50), nullable=False),
        sa.Column("valid_from", sa.DateTime(), nullable=False),
        sa.Column("valid_to", sa.DateTime(), nullable=False),
        sa.Column("version", sa.BigInteger(), nullable=False, server_default="1"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_factors_category", "emission_factors", ["category"], unique=False)
    op.create_unique_constraint(
        "uq_factors_key",
        "emission_factors",
        ["category", "geography", "valid_from", "version"],
    )

    op.create_table(
        "emissions",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column("org_id", sa.BigInteger(), sa.ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False),
        sa.Column("event_id", sa.BigInteger(), sa.ForeignKey("activity_events.id", ondelete="CASCADE"), nullable=False),
        sa.Column("factor_id", sa.BigInteger(), sa.ForeignKey("emission_factors.id", ondelete="RESTRICT"), nullable=False),
        sa.Column("scope", sa.String(length=5), nullable=False),
        sa.Column("co2e_kg", sa.Numeric(18, 6), nullable=False),
        sa.Column("calc_version", sa.String(length=20), nullable=False, server_default="v1"),
        sa.Column("uncertainty_pct", sa.Numeric(5, 2), nullable=True),
        sa.Column("provenance_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_emissions_org_id", "emissions", ["org_id"], unique=False)
    op.create_unique_constraint("uq_emissions_org_event", "emissions", ["org_id", "event_id"])


def downgrade() -> None:
    op.drop_constraint("uq_emissions_org_event", "emissions", type_="unique")
    op.drop_index("ix_emissions_org_id", table_name="emissions")
    op.drop_table("emissions")

    op.drop_constraint("uq_factors_key", "emission_factors", type_="unique")
    op.drop_index("ix_factors_category", table_name="emission_factors")
    op.drop_table("emission_factors")

    op.drop_constraint("uq_events_org_hash", "activity_events", type_="unique")
    op.drop_index("ix_events_category", table_name="activity_events")
    op.drop_index("ix_events_occurred_at", table_name="activity_events")
    op.drop_index("ix_events_org_id", table_name="activity_events")
    op.drop_table("activity_events")
