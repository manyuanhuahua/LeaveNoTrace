from flask import Blueprint, jsonify,Response,request
from flask_login import login_required,current_user
from app.models import User,List,Review,Activity,Photo,db,Trail
from app.forms import CreateListForm
import json
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)

    return user.to_dict()

#get all lists
@user_routes.route('/<int:userId>/lists')
@login_required
def user_get_lists(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors':['User can not be found']},404

    lists = List.query.filter(List.user_id == userId).all()
    res = {}

    for li in lists:
        content= []
        for el in li.list_trails:
            content.append(el.preview_dict())

        res[li.id] = li.to_dict()
        res[li.id]['content']=content
    return {'Lists':res}

#get a list detail
@user_routes.route('/<int:userId>/lists/<int:listId>')
@login_required
def user_list_detail(userId,listId):
    user = User.query.get(userId)
    if not user:
        return {'errors':['User can not be found']},404

    li = List.query.get(listId)
    if not list:
        return {'errors':['List can not be found']},404

    res = {}
    content = []
    for el in li.list_trails:
        # print('list-----',el.preview_dict())
        content.append(el.preview_dict())


    list_dict = li.to_dict()
    res[li.id] = list_dict
    res[li.id]['content']=content
    return res

#create a list
@user_routes.route('/<int:userId>/lists/new',methods=["POST"])
@login_required
def create_list(userId):

    form = CreateListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        li = List(
            name=form.data['name'],
        )
        li.user_id=current_user.id


        db.session.add(li)
        db.session.commit()

        res = li.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#update a list
@user_routes.route('/<int:userId>/lists/<int:listId>',methods=["PUT"])
@login_required
def update_list(userId,listId):

    li = List.query.get(listId)
    if not list:
        return {'errors':['List can not be found']},404

    if li.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        li.name=form.data['name']

        db.session.commit()

        res = li.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete a list
@user_routes.route('/<int:userId>/lists/<int:listId>',methods=["DELETE"])
@login_required
def delete_photo(userId,listId):
    li = List.query.get(listId)
    if not list:
        return {'errors':['List can not be found']},404

    if li.user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(li)
    db.session.commit()

    res = {}
    content = []
    for el in li.list_trails:
        # print('list-----',el.preview_dict())
        content.append(el.preview_dict())

    list_dict = li.to_dict()
    res[li.id] = list_dict
    res[li.id]['content']=content

    return res

#get all reviews
@user_routes.route('/<int:userId>/reviews')
@login_required
def user_get_reviews(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors':['User can not be found']},404

    reviews = Review.query.filter(Review.user_id == userId).all()
    res = {}
    for review in reviews:
        res[review.id] = review.to_dict()
    return {'Reviews':res}


#get all activities
@user_routes.route('/<int:userId>/activities')
@login_required
def user_get_activities(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors':['User can not be found']},404

    activities = Activity.query.filter(Activity.user_id == userId).all()
    res = {}
    for activity in activities:
        res[activity.id] = activity.to_dict()
    return {'Activities':res}

#get all photos
@user_routes.route('/<int:userId>/photos')
@login_required
def user_get_photos(userId):
    user = User.query.get(userId)
    if not user:
        return {'errors':['User can not be found']},404

    photos = Photo.query.filter(Photo.user_id == userId).all()
    res = {}
    for photo in photos:
        res[photo.id] = photo.to_dict()
    return {'Photos':res}
