from __future__ import annotations

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0003_add_users_email_index"
down_revision = "0002_events_factors_emissions"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Align with models.py: User.email has index=True and login queries by email
    op.create_index("ix_users_email", "users", ["email"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_users_email", table_name="users")


