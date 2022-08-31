from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from .tags import trail_tags

class Trail(db.Model):
    __tablename__="trails"

    id=db.Column(db.Integer,primary_key=True)
    park_id = db.Column(db.Integer,db.ForeignKey("parks.id", ondelete="CASCADE"),nullable=False)
    name = db.Column(db.String(255),nullable=False,unique=True)
    description = db.Column(db.String(500),nullable=False)
    preview_img = db.Column(db.String(255),nullable=False)
    length = db.Column(db.Numeric(6,2))
    elevation = db.Column(db.Integer,nullable=False)
    difficulty = db.Column(db.String(100),nullable=False)
    lat=db.Column(db.Float(10,2),nullable=False)
    log=db.Column(db.Float(10,2),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    park=relationship("Park",back_populates="trails")
    activities = db.relationship("Activity", back_populates="trail", cascade="all, delete")
    reviews = db.relationship("Review", back_populates="trail", cascade="all, delete")


     trail_tags = db.relationship(
        "Tag",
        secondary=trail_tags,
        back_populates="tags_trail",
        cascade="all, delete"
    )

    def to_dict(self):
        return {
        "id": self.id,
        "parkId": self.park_id,
        "name": self.name,
        "description": self.description,
        "preview_img": self.preview_img,
        "length": self.length,
        "elevation": self.elevation,
        "difficulty": self.difficulty,
        "lat": self.lat,
        "log": self.log,
        "tags": {
            "name":list(self.trail_tags.name)
        }
        "totalActivities" : len(self.activities),
        "totalReviews" : len(self.reviews),
        }
