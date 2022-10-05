from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError,Length
from app.models import List

class CreateListForm(FlaskForm):
    name = StringField('name',validators=[DataRequired(message='List name is required'),Length(max=30,message='Maximum Name length is 30.')])
