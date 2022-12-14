"""empty message

Revision ID: 7df2e9a28738
Revises: 
Create Date: 2023-01-02 14:05:39.354679

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7df2e9a28738'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('preview_img', sa.String(length=255), nullable=False),
    sa.Column('acreage', sa.Integer(), nullable=True),
    sa.Column('contact', sa.String(length=50), nullable=True),
    sa.Column('state', sa.String(length=50), nullable=True),
    sa.Column('country', sa.String(length=50), nullable=True),
    sa.Column('lat', sa.Float(precision=12), nullable=False),
    sa.Column('log', sa.Float(precision=12), nullable=False),
    sa.Column('park_originlinks', sa.String(length=500), nullable=True),
    sa.Column('park_hours', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_img', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('park_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('preview_img', sa.String(length=255), nullable=False),
    sa.Column('length', sa.Float(precision=2), nullable=True),
    sa.Column('elevation', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.String(length=100), nullable=False),
    sa.Column('lat', sa.Float(precision=12), nullable=False),
    sa.Column('log', sa.Float(precision=12), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['park_id'], ['parks.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trail_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('ori_lat', sa.Float(precision=12), nullable=False),
    sa.Column('ori_log', sa.Float(precision=12), nullable=False),
    sa.Column('des_lat', sa.Float(precision=12), nullable=False),
    sa.Column('des_log', sa.Float(precision=12), nullable=False),
    sa.Column('distance', sa.String(length=100), nullable=False),
    sa.Column('duration', sa.String(length=100), nullable=False),
    sa.Column('static_url', sa.String(length=3000), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['trail_id'], ['trails.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('list_trails',
    sa.Column('trail_id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['trail_id'], ['trails.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('trail_id', 'list_id')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('trail_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=3000), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['trail_id'], ['trails.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('trail_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=500), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['trail_id'], ['trails.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trail_tags',
    sa.Column('trail_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['trail_id'], ['trails.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('trail_id', 'tag_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('trail_tags')
    op.drop_table('reviews')
    op.drop_table('photos')
    op.drop_table('list_trails')
    op.drop_table('activities')
    op.drop_table('trails')
    op.drop_table('lists')
    op.drop_table('users')
    op.drop_table('tags')
    op.drop_table('parks')
    # ### end Alembic commands ###
