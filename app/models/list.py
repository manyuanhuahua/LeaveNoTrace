from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


list_trails = db.Table(
  "list_trails",
  db.Column("trail_id", db.Integer, db.ForeignKey("trails.id", ondelete="CASCADE"), primary_key=True),
  db.Column("list_id", db.Integer, db.ForeignKey("lists.id", ondelete="CASCADE"), primary_key=True)
)


class List(db.Model):
    __tablename__="lists"

    id=db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    name = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    user=relationship("User",back_populates="lists")

    list_trails = db.relationship(
        "Trail",
        secondary=list_trails,
        back_populates="trails_list",
        passive_deletes=True
     )

    def to_dict(self):
        return {
          "id": self.id,
          "name":self.name,
          "createdAt": self.created_at,
          "user": {
                    "id": self.user.id,
                    "username": self.user.username,
                    "profileImg": self.user.profile_img
                },
        }
