from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey



class Review(db.Model):
    __tablename__="reviews"

    id=db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    trail_id = db.Column(db.Integer,db.ForeignKey("trails.id", ondelete="CASCADE"),nullable=False)
    content = db.Column(db.String(500))
    rating = db.Column(db.Integer,nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user=relationship("User",back_populates="reviews")
    trail=relationship("Trail",back_populates="reviews")

    def to_dict(self):
        return {
        "id": self.id,
        "trailPreview":self.trail.preview_img,
        "trailId": self.trail_id,
        "trailName":self.trail.name,
        "content": self.content,
        "rating": self.rating,
        "createdAt": self.created_at,
        "user": {
                "id":self.user_id,
                "profileImage": self.user.profile_img,
                "username": self.user.username
                },
        }
