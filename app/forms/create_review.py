from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class CreateReviewForm(FlaskForm):
    content = StringField('content')
    rating = IntegerField('rating',validators=[DataRequired(message='Rating is required')])
