import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useParams} from "react-router-dom";
import { getActivitiesThunk,getPhotosThunk,getReviewsThunk } from '../../store/session';
import {getListsThunk} from "../../store/list"

import Loader from '../loader/Loader';

import "../style/profile.css"

function UserDetail() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const session = useSelector(state => state.session.user);
    const activities = useSelector(state => state.activity);
    const activityList = Object.values(activities).reverse()
    const photos = useSelector(state => state.photo);
    const photoList = Object.values(photos).reverse()
    const reviews = useSelector(state => state.review);
    const reviewsList = Object.values(reviews).reverse();
    const lists = useSelector(state=>state.list)
    const listsList = Object.values(lists).reverse()
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getReviewsThunk(userId))
            .then(()=>dispatch(getPhotosThunk(userId)))
            .then(()=>dispatch(getActivitiesThunk(userId)))
            .then(()=>dispatch(getListsThunk(userId)))
            .then(() => setIsLoaded(true));
    }, [dispatch,userId]);


    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

    return isLoaded && (
        <div className='user-profile-container'>
            <img src='' className='cover-img' />
            <div className='profile-detail'>
                <div className='pd-left'>
                    <div className='pd-row'>
                        <img src={session.profileImg} className='pd-img'/>
                        <div className='user-stats'>
                            <h3>{session.username}</h3>
                            <p>Total Activities:{session.totalActivities} Total Photos:{session.totalPhotos} Total Reviews:{session.totalReview} Total Lists:{session.totalLists}</p>
                        </div>
                    </div>
                </div>
                <div className='pd-right'></div>

            </div>
        </div>
    )

}

export default UserDetail
