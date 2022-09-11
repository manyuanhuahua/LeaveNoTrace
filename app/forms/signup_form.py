from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_checker(form, field):
    # Checking if username is already in use
    # passowrd = field.data
    # user = User.query.filter(User.username == username).first()
    if len(field.data) < 5:
        raise ValidationError("Password's length should be more than 5")


def profile_checker(form, field):
    # Checking if username is already in use
    profile = field.data
    type = ['jpg','png','jpeg']
    last = profile.split('.')[-1]
    if last not in type:
        raise ValidationError('Profile type should be jpg/png/jpeg.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Email is required'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required'),password_checker])
    profile_img = StringField('profile image',validators=[profile_checker])
