from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class Route(db.Model):
    __tablename__="routes"

    id=db.Column(db.Integer,primary_key=True)
    activity_id = db.Column(db.Integer,db.ForeignKey("activities.id", ondelete="CASCADE"),nullable=False)
    lat=db.Column(db.String(100),nullable=False)
    log=db.Column(db.String(100),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    activity = relationship("Activity", back_populates="routes")

    #  def to_dict(self):
    # return {
    # #   "id": self.id,
    # #   "userId": self.userId,
    # #   "postId": self.postId,
    # #   "content": self.content,
    # #   "createdAt": self.created_at,
    # #   "user": {
    # #             "profileImage": self.user.profile_image,
    # #             "username": self.user.username
    # #         },
    # #   "totalLikes": len(self.comment_like_users)
    # }
