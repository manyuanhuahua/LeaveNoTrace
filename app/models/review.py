from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey



class Review(db.Model):
    __tablename__="reviews"

    id=db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    trail_id = db.Column(db.Integer,db.ForeignKey("trails.id", ondelete="CASCADE"),nullable=False)
    content = db.Column(db.String(500),nullable=False)
    rating = db.Column(db.Integer,nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user=relationship("User",back_populates="reviews")
    trail=relationship("Trail",back_populates="reviews")

    def to_dict(self):
        return {
        "id": self.id,
        "userId": self.user_id,
        "trailId": self.trail_id,
        "content": self.content,
        "rating": self.rating,
        "createdAt": self.created_at,
        "user": {
                    "profileImage": self.user.profile_image,
                    "username": self.user.username
                },
        }
