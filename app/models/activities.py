from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Activity(db.Model):
    __tablename__="activities"

    id=db.Column(db.Integer,primary_key=True)
    trail_id = db.Column(db.Integer,db.ForeignKey("trails.id", ondelete="CASCADE"),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    name = db.Column(db.String(255),nullable=False,unique=True)
    length = db.Column(db.Numeric(10,2))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user = relationship("User", back_populates="activities")
    trail = relationship("Trail", back_populates="activities")
    routes = db.relationship("Route", back_populates="activity", cascade="all, delete")

     def to_dict(self):
    return {
        "id": self.id,
        "trailId": self.trail_id,
        "user": {
            'username':self.user.username,
            'profileImg':self.user.profile_img,
            },
        "name": self.name,
        "length": self.length,
        "createdAt": self.created_at
    }
