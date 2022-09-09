from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Activity(db.Model):
    __tablename__="activities"

    id=db.Column(db.Integer,primary_key=True)
    trail_id = db.Column(db.Integer,db.ForeignKey("trails.id", ondelete="CASCADE"),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    name = db.Column(db.String(255),nullable=False,unique=True)
    ori_lat=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    ori_log=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    des_lat=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    des_log=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    distance=db.Column(db.String(100),nullable=False)
    duration=db.Column(db.String(100),nullable=False)
    static_url=db.Column(db.String(3000),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user = relationship("User", back_populates="activities")
    trail = relationship("Trail", back_populates="activities")
    # routes = db.relationship("Route", back_populates="activity", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "trail":{
                'id':self.trail.id,
                'lat':self.trail.lat,
                'lng':self.trail.log,
            },
            "user": {
                'id':self.user_id,
                'username':self.user.username,
                'profileImg':self.user.profile_img
                },
            "name": self.name,
            "oriLat":self.ori_lat,
            "oriLog":self.ori_log,
            "desLat":self.des_lat,
            "desLog":self.des_log,
            "distance":self.distance,
            "duration":self.duration,
            "staticMap":self.static_url,
            "createdAt": self.created_at
        }
