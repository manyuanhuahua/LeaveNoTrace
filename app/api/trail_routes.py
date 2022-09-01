from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Park, Trail,Review,db
from app.forms import CreateReviewForm
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

    # print('review----',review)
    if form.validate_on_submit():
        review.content = form.data['content']
        review.rating=form.data['rating']
        # print('review content----',review.user.username)

    #         # id = review.id,
    #         # trail_id = review.trail_id,
    #         # created_at=review.created_at,
        db.session.commit()
        review_dic = review.to_dict()

    #     # user_dic = {
    #     #     "id" : current_user.id,
    #     #     "profileImage": current_user.profile_img,
    #     #     "username":current_user.username
    #     # }
    #     res=review.to_dict()
    #     # review["user"] = user_dic
        # print('review-----',review)
        # review_dic = review.to_dict()
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
