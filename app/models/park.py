from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Park(db.Model):
    __tablename__="parks"

    id=db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(255),nullable=False,unique=True)
    description = db.Column(db.String(500),nullable=False)
    preview_img = db.Column(db.String(255),nullable=False)
    acreage = db.Column(db.Integer)
    contact = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    lat=db.Column(db.Float(10,2),nullable=False)
    log=db.Column(db.Float(10,2),nullable=False)
    park_originlinks = db.Column(db.String(500))
    park_hours = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    trails=relationship("Trail",back_populates="park",cascade="all,delete")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "preview_img": self.preview_img,
            "acreage": self.acreage,
            "contact": self.contact,
            "state": self.state,
            "country": self.country,
            "lat": self.lat,
            "log": self.log,
            "park_originlinks": self.park_originlinks,
            "park_hours": self.park_hours,
            # "totalReviews": len(self.trails.reviews),
        }
