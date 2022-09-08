from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Activity

class CreateActivityForm(FlaskForm):
    # trail_id = IntegerField('trail id',validators=[DataRequired()])
    # user_id = IntegerField('user id',validators=[DataRequired()])
    name = StringField('name',validators=[DataRequired(message='Name is required')])
    ori_lat = DecimalField('start latitude',validators=[DataRequired(message='Origin latitude is required')])
    ori_log = DecimalField('start longtitude',validators=[DataRequired(message='Origin longtitude is required')])
    des_lat = DecimalField('destination latitude',validators=[DataRequired(message='Destination latitude is required')])
    des_log = DecimalField('destination longtitude',validators=[DataRequired(message='Destination longtitude is required')])
    distance = StringField('distance',validators=[DataRequired(message='Distance is required')])
    duration = StringField('duration',validators=[DataRequired(message='Duration is required')])
    static_url = StringField('static map',validators=[DataRequired(message='Static map url is required')])
