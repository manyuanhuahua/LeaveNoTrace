from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255),nullable=False)

    photos = db.relationship("Photo", back_populates="user",cascade="all, delete")
    reviews = db.relationship("Review", back_populates="user",cascade="all, delete")
    activities = db.relationship("Activity", back_populates="user",cascade="all, delete")
    lists = db.relationship("List", back_populates="user",cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImg':self.profile_img,
            'totalReview':len(self.reviews),
            'totalActivities':len(self.activities),
            'totalPhotos':len(self.photos),
            'totalLists':len(self.lists)
        }
