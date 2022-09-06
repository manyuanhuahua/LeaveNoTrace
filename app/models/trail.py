from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


trail_tags = db.Table(
  "trail_tags",
  db.Column("trail_id", db.Integer, db.ForeignKey("trails.id", ondelete="CASCADE"), primary_key=True),
  db.Column("tag_id", db.Integer, db.ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)

class Trail(db.Model):
    __tablename__="trails"

    id=db.Column(db.Integer,primary_key=True)
    park_id = db.Column(db.Integer,db.ForeignKey("parks.id", ondelete="CASCADE"),nullable=False)
    name = db.Column(db.String(255),nullable=False,unique=True)
    description = db.Column(db.String(500),nullable=False)
    preview_img = db.Column(db.String(255),nullable=False)
    length = db.Column(db.Float(precision=2, asdecimal=False))
    elevation = db.Column(db.Integer,nullable=False)
    difficulty = db.Column(db.String(100),nullable=False)
    lat=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    log=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
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

    def avg_rating(self):
        totalRating = 0

        for review in self.reviews:
            totalRating += review.rating

        avg_rating = totalRating / len(self.reviews)
        return round(avg_rating,1)

    def to_dict(self):
        return {
        "id": self.id,
        "parkId": self.park_id,
        "parkName":self.park.name,
        "name": self.name,
        "description": self.description,
        "preview_img": self.preview_img,
        "length": self.length,
        "elevation": self.elevation,
        "difficulty": self.difficulty,
        "lat": self.lat,
        "log": self.log,
        "avgRating":self.avg_rating(),
        "totalActivities" : len(self.activities),
        "totalReviews" : len(self.reviews),

        }

    def preview_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "preview_img": self.preview_img,
            "length": self.length,
            "difficulty": self.difficulty,
            "park":{
                "name":self.park.name
            },
            "totalReviews": len(self.reviews),
            "avgRating":self.avg_rating()
            }
