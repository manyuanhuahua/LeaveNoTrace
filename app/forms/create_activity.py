from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Activity

class CreateActivityForm(FlaskForm):
    # trail_id = IntegerField('trail id',validators=[DataRequired()])
    # user_id = IntegerField('user id',validators=[DataRequired()])
    name = StringField('name')
    ori_lat = DecimalField('start latitude',validators=[DataRequired()])
    ori_log = DecimalField('start longtitude',validators=[DataRequired()])
    des_lat = DecimalField('destination latitude',validators=[DataRequired()])
    des_log = DecimalField('destination longtitude',validators=[DataRequired()])
    distance = StringField('distance',validators=[DataRequired()])
    duration = StringField('duration',validators=[DataRequired()])
    static_url = StringField('static map',validators=[DataRequired()])
