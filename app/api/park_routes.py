from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Park, Trail
import json

park_routes = Blueprint('parks',__name__)

#get all parks
@park_routes.route('/all')
def get_all_park():
    parks = Park.query.all()
    res = {}
    for park in parks:
        res[park.id]=park.preview_dict()
    return {'Parks':res}


#get a park detail
@park_routes.route('/<int:parkId>')
@login_required
def get_park_detail(parkId):
    park= Park.query.get(parkId)
    if not park:
        return {'errors':['Park can not be found']},404

    trails = Trail.query.filter(Trail.park_id == parkId).all()
    totalReviews = 0

    for trail in trails:
        totalReviews += len(trail.reviews)

    park_dict = park.to_dict()
    park_dict['totalTrails'] = len(park.trails)
    park_dict['totalReviews'] = totalReviews
    return park_dict

#get all trail for a park
@park_routes.route('/<int:parkId>/trails')
@login_required
def get_park_trails(parkId):
    park= Park.query.get(parkId)
    if not park:
        return {'errors':['Park can not be found']},404

    trails = Trail.query.filter(Trail.park_id == parkId).all()
    res = {}
    for trail in trails:
        
        res[trail.id] = trail.preview_dict()

    return res
