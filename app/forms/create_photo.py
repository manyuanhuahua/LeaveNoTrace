from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import Photo

class CreatePhotoForm(FlaskForm):
    url = StringField('url',validators=[DataRequired(message='Photo file is required')])
