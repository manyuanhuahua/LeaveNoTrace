from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

trail_tags = db.Table(
  "post_likes",
  db.Column("trail_id", db.Integer, db.ForeignKey("trail.id", ondelete="CASCADE"), primary_key=True),
  db.Column("tag_id", db.Integer, db.ForeignKey("tag.id", ondelete="CASCADE"), primary_key=True)
)

class Tag(db.Model):
    __tablename__="tags"

    id=db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(255))

    tags_trail = db.relationship(
        "Trail",
        secondary=trail_tags,
        back_populates="like_posts",
        passive_deletes=True
     )


    # def to_dict(self):
    # return {
    #   # "id": self.id,
    #   # "userId": self.userId,
    #   # "description": self.description,
    #   # "imageUrl": self.image_url,
    #   # "createdAt": self.created_at,
    #   # "user": {
    #   #     "profileImage":self.user.profile_image,
    #   #     "username":self.user.username,
    #   #     'total_followers': self.user.followers.count(),
    #   #     'total_followings': self.user.following.count(),
    #   #     'total_posts': len(self.user.posts),
    #   #     'fullname': self.user.fullname
    #   # },
    #   # "totalComments": len(self.comments),
    #   # "totalLikes": len(self.post_like_users),
    # }
