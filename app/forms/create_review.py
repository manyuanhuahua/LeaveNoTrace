from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import Review

class CreateReviewForm(FlaskForm):
    content = StringField('content',validators=[DataRequired(message='Content is required'),Length(max=100,message='Maximum Content length is 100')])
    rating = IntegerField('rating',validators=[DataRequired(message='Rating is required')])
