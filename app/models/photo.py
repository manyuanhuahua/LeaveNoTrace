from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Photo(db.Model):
    __tablename__="photos"

    id=db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    trail_id = db.Column(db.Integer,db.ForeignKey("trails.id", ondelete="CASCADE"),nullable=False)
    url=db.Column(db.String(3000),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user=relationship("User",back_populates="photos")
    trail=relationship("Trail",back_populates="photos")

    def to_dict(self):
        return {
          "id": self.id,
          "url": self.url,
          "createdAt": self.created_at,
          "user": {
                    "id": self.user.id,
                    "username": self.user.username,
                    "profileImg": self.user.profile_img
                },
          "trail": {
                    "id": self.trail.id,
                    "name": self.trail.name
                },

        }
