# from flask import Blueprint, jsonify, Response,request
# # from flask_api import status
# from flask_login import login_required, current_user
# from app.models import Park, Trail,Activity,Route,db
# # from app.forms import CreateReviewForm
# import json

# activity_routes = Blueprint('activities',__name__)

# #get a route
# @activity_routes.route('/all')
# def get_all_trails():
#     trails = Trail.query.all()
#     res = {}
#     for trail in trails:
#         res[trail.id]=trail.preview_dict()
#     return res
