from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from .trail import trail_tags



class Tag(db.Model):
    __tablename__="tags"

    id=db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(255))

    tags_trail = db.relationship(
        "Trail",
        secondary=trail_tags,
        back_populates="trail_tags",
        passive_deletes=True
     )
