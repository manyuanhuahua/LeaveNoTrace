from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Park, Trail,Review,Activity,db
from app.forms import CreateReviewForm,CreateActivityForm
import json

trail_routes = Blueprint('trails',__name__)

#get all trails
@trail_routes.route('/all')
def get_all_trails():
    trails = Trail.query.all()
    res = {}
    for trail in trails:
        res[trail.id]=trail.preview_dict()
    return res





#get a trail detail
@trail_routes.route('/<int:trailId>')
@login_required
def get_trail_detail(trailId):
    trail= Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    reviews = Review.query.filter(Review.trail_id == trailId).all()
    totalRating = 0

    for review in reviews:
        totalRating += review.rating

    tags = []
    for tag in trail.trail_tags:
        tags.append(tag.name)

    avgRating = totalRating / len(trail.reviews)
    trail_dict = trail.to_dict()
    trail_dict['avgRating'] = avgRating
    trail_dict['tags'] = tags
    return trail_dict


#reviews

#get all reviews for a trail
@trail_routes.route('/<int:trailId>/reviews')
@login_required
def get_trail_reviews(trailId):
    trail= Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    reviews = Review.query.filter(Review.trail_id == trailId).all()

    res = {}
    for review in reviews:
        res[review.id] = review.to_dict()
    return {'Reviews':res}



#create a review for a trail
@trail_routes.route('/<int:trailId>/reviews/new', methods=["POST"])
@login_required
def create_reviews(trailId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            content=form.data['content'],
            rating=form.data['rating']
        )
        review.user_id = current_user.id
        review.trail_id = trailId

        db.session.add(review)
        db.session.commit()

        res = review.to_dict()
        return res
    return {'errors':['rating is required']},400


#update a review for a trail
@trail_routes.route('/<int:trailId>/reviews/<int:reviewId>', methods=["PUT"])
@login_required
def update_reviews(trailId,reviewId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    review = Review.query.get(reviewId)
    if not review:
        return {'errors':['Review can not be found']},404

    if review.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        review.content = form.data['content']
        review.rating=form.data['rating']

        db.session.commit()
        review_dic = review.to_dict()

        return review_dic
    return {'errors':['rating is required']},400

#delete a review for a trail
@trail_routes.route('/<int:trailId>/reviews/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_reviews(trailId,reviewId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    review = Review.query.get(reviewId)
    if not review:
        return {'errors':['Review can not be found']},404

    if review.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(review)
    db.session.commit()
    return {"message":"Successfully deleted!"}


#activity

#get all activities for a trail
@trail_routes.route('/<int:trailId>/activities')
@login_required
def get_all_activities(trailId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    activities = Activity.query.filter(Activity.trail_id == trailId).all()
    res = {}
    for activity in activities:
        res[activity.id] = activity.to_dict()
    return {'Activities':res}


#create an activity
@trail_routes.route('/<int:trailId>/activities/new', methods=["POST"])
@login_required
def create_activity(trailId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    form = CreateActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        activity = Activity(
            name=form.data['name'],
            ori_lat=form.data['ori_lat'],
            ori_log=form.data['ori_log'],
            des_lat=form.data['des_lat'],
            des_log=form.data['des_log']
        )
        activity.trail_id=trailId
        activity.user_id=current_user.id


        db.session.add(activity)
        db.session.commit()

        res = activity.to_dict()
        return res
    return {'errors':['rating is required']},400


#update an activity
@trail_routes.route('/<int:trailId>/activities/<int:activityId>', methods=["PUT"])
@login_required
def update_activity(trailId,activityId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    activity = Activity.query.get(activityId)
    if not activity:
        return {'errors':['Activity can not be found']},404

    if activity.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        activity.name = form.data['name']
        activity.ori_lat=form.data['ori_lat']
        activity.ori_log=form.data['ori_log']
        activity.des_lat=form.data['des_lat']
        activity.des_log=form.data['des_log']

        db.session.commit()

        res = activity.to_dict()
        return res
    return {'errors':['rating is required']},400

#delete an activity
@trail_routes.route('/<int:trailId>/activities/<int:activityId>', methods=["DELETE"])
@login_required
def delete_activities(trailId,activityId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    activity = Activity.query.get(activityId)
    if not activity:
        return {'errors':['Activity can not be found']},404

    if activity.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(activity)
    db.session.commit()
    return {"message":"Successfully deleted!"}
