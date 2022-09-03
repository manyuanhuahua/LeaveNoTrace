from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Activity

class CreateActivityForm(FlaskForm):
    # trail_id = IntegerField('trail id',validators=[DataRequired()])
    # user_id = IntegerField('user id',validators=[DataRequired()])
    name = StringField('name')
    ori_lat = StringField('start latitude',validators=[DataRequired()])
    ori_log = StringField('start longtitude',validators=[DataRequired()])
    des_lat = StringField('destination latitude',validators=[DataRequired()])
    des_log = StringField('destination longtitude',validators=[DataRequired()])
    distance = IntegerField('distance',validators=[DataRequired()])
    duration = IntegerField('duration',validators=[DataRequired()])
    static_url = StringField('static map',validators=[DataRequired()])
