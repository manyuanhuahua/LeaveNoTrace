from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Park, Trail,Review,Activity,Photo,List,db
from app.forms import CreateReviewForm,CreateActivityForm,CreatePhotoForm
import json
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3,allowed_file,get_unique_filename)

trail_routes = Blueprint('trails',__name__)

#get all trails
@trail_routes.route('/all')
def get_all_trails():
    trails = Trail.query.all()



    res = {}
    for trail in trails:
        tags = []
        for tag in trail.trail_tags:
            tags.append(tag.name)
        res[trail.id]=trail.preview_dict()
        res[trail.id]['tags']=tags
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


    trail_dict = trail.to_dict()
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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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


#get an activity detail
@trail_routes.route('/<int:trailId>/activities/<int:activityId>')
@login_required
def get_activity_detail(trailId,activityId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    activity= Activity.query.get(activityId)
    if not activity:
        return {'errors':['Activity can not be found']},404


    activity_dict = activity.to_dict()
    return activity_dict


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
            des_log=form.data['des_log'],
            distance=form.data['distance'],
            duration=form.data['duration'],
            static_url=form.data['static_url']
        )
        activity.trail_id=trailId
        activity.user_id=current_user.id


        db.session.add(activity)
        db.session.commit()

        res = activity.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
        activity.distance=form.data['distance']
        activity.duration=form.data['duration']
        activity.static_url=form.data['static_url']

        db.session.commit()

        res = activity.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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


#photos
@trail_routes.route('/<int:trailId>/photos')
@login_required
def get_all_photos(trailId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    photos = Photo.query.filter(Photo.trail_id == trailId).all()
    res = {}
    for photo in photos:
        res[photo.id] = photo.to_dict()
    return {'Photos':res}

#get an photo detail
@trail_routes.route('/<int:trailId>/photos/<int:photoId>')
@login_required
def get_photo_detail(trailId,photoId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    photo= Photo.query.get(photoId)
    if not photo:
        return {'errors':['Photo can not be found']},404


    photo_dict = photo.to_dict()
    return photo_dict


#upload photos
@trail_routes.route('/<int:trailId>/photos/new', methods=["POST"])
@login_required
def create_photo_post(trailId):

    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photo = Photo(
            url=form.data['url']
        )
        photo.trail_id=trailId
        photo.user_id=current_user.id

        # print('backend-----',photo)
        db.session.add(photo)
        db.session.commit()

        res = photo.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




#update an photo
@trail_routes.route('/<int:trailId>/photos/<int:photoId>', methods=["PUT"])
@login_required
def update_photo(trailId,photoId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    photo = Photo.query.get(photoId)
    if not photo:
        return {'errors':['Photo can not be found']},404

    if photo.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photo.title=form.data['title']
        photo.url=form.data['url']

        db.session.commit()


        res = photo.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delete a photo
@trail_routes.route('/<int:trailId>/photos/<int:photoId>', methods=["DELETE"])
@login_required
def delete_photo(trailId,photoId):
    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    photo = Photo.query.get(photoId)
    if not photo:
        return {'errors':['Photo can not be found']},404

    if photo.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(photo)
    db.session.commit()
    return {"message":"Successfully deleted!"}

#create image url
@trail_routes.route('/photos/upload', methods=["POST"])
@login_required
def upload_image():
    # print('file-----', request.files)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload,400

    url = upload['url']
    # print('url-----',url)
    return {"url":url}


#add trail to list
@trail_routes.route('/<int:trailId>/lists/<int:listId>/new', methods=["PUT"])
@login_required
def update_list_content(trailId,listId):

    li = List.query.get(listId)
    if not li:
        return {'errors':['List can not be found']},404


    trail = Trail.query.get(trailId)
    if not trail:
        return {'errors':['Trail can not be found']},404

    if li.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    if trail in li.list_trails:
        li.list_trails.remove(trail)
        db.session.commit()
    else:
        li.list_trails.append(trail)
        db.session.commit()

    res = {}
    content = []
    for el in li.list_trails:
        content.append(el.preview_dict())
    res[li.id] = li.to_dict()
    res[li.id]['content']=content
    return res
