import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link} from "react-router-dom";
import {getTrailDetailThunk} from "../../store/trail"
import CreateReviewModal from '../modals/CreateReviewModal';
import ReviewList from '../review/reviewList';
import NearbyTrails from './nearbyTrails';
import ActivityList from '../map/ActivityList';
import {getReviewsThunk} from "../../store/review"
import {getActivitiesThunk} from "../../store/activity"
import DisplayRating from '../../helper/displayRating';


import "../style/trail.css"

function TrailDetail() {
    const dispatch = useDispatch();
    const {trailId} = useParams();
    const trailObj = useSelector(state => state.trail);
    const trail = Object.values(trailObj)[0];
    // const session = useSelector(state => state.session.user);
    const [trailIsLoaded, setTrailsIsLoaded] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [showReview, setShowReview] = useState(true);
    const [showActivity, setShowActivity] = useState(false);
    const reviews = useSelector(state => state.review);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const activities = useSelector(state => state.activity);
    const [activityIsLoaded, setActivityIsLoaded] = useState(false);



    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId]);


    useEffect(() => {
        dispatch(getActivitiesThunk(trailId)).then(() => setActivityIsLoaded(true));
    }, [dispatch,trailId]);

    useEffect(() => {
        dispatch(getTrailDetailThunk(trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,trailId,reviews,activities]);

    if(!trail){
        return null
    }






    return (trailIsLoaded && trail && reviewsIsLoaded && activityIsLoaded &&(
        <div className='trail-detail-main-container'>
            <div className='trail-detail-top-box'>
                <div className='trail-detail-pre-img'>
                    <img className='trail-preview' src={trail.preview_img} alt='' />
                </div>
                <h1>{trail.name}</h1>
                <div className='trail-summary'>
                    <div className='rate'>
                        <p>Difficulty: {trail.difficulty}</p>
                        {/* <p>Total Reviews: {trail.totalReviews}</p> */}
                        <p>{trail.parkName}</p>
                    </div>
                    <div className='create-map'>
                        <Link to={`/trails/${trail.id}/activities/new`} trail={trail} exact="true" style={{textDecoration: 'none', color:'#fff'}} >
                            Create Activity
                        </Link>
                    </div>

                </div>

            </div>
            <div className='mid-box'>


                        <div className='description'>
                            <p>{trail.description}</p>
                        </div>
                        <div className='info'>
                            <div className='len'>
                                <h4 className='p-title'>Length:</h4>
                                <p>{trail.length}mi</p>
                            </div>
                            <div className='ele'>
                                    <h4 className='p-title'>Elevation gain:</h4>
                                    <p>{trail.elevation}ft</p>
                            </div>
                        </div>
                        <div className='tags'>

                            {trail.tags.map((tag,index)=>(
                                <p className='tag' key={index}>{tag}</p>
                            ))}
                        </div>

            </div>
            <div className='trail-detail-bot-box'>
                <div className='bot-left-box'>
                        <div className='review-activity-bar'>
                            <div className='bar-review' onClick={()=>{setShowReview(true); setShowActivity(false)}}>
                                Reviews
                            </div>
                            <div className='bar-activity' onClick={()=>{setShowReview(false); setShowActivity(true)}}>
                                Activities
                            </div>
                        </div>

                        <div className='rate-create'>
                        {showReview &&<div className='rate-display'>
                            <div className='trail-avg-rage'>
                                <DisplayRating rating={trail.avgRating} />
                                <h1>{(trail.avgRating).toFixed(2)}</h1>
                            </div>
                                <p>{trail.totalReviews} Review(s)</p>
                            </div>}

                        {showReview &&<div className='create-button'>
                                <div className='create-review'>
                                    <CreateReviewModal trail={trail} createModal={createModal} setCreateModal={setCreateModal} />
                                </div></div>}
                        {showActivity &&<div className='rate-display'>
                                <h1>{trail.totalActivities}</h1>
                                <p>{trail.totalActivities <= 1? 'Activity' : 'Activities'}</p>
                            </div>}
                        {showActivity &&  <div className='create-button'>
                                <div className='create-map'>
                                    <Link to={`/trails/${trail.id}/activities/new`} trail={trail} exact="true" style={{textDecoration: 'none', color:'#fff'}} >
                                    Create Activity
                                    </Link>
                                </div>
                                </div>}
                        </div>
                        <div className='left-list-box'>
                        {showReview && <div className='review-list'>
                            <ReviewList trailId={trailId} reviews={reviews}/>
                        </div>}
                        {showActivity && <div className='activity-list'>
                            <ActivityList trailId={trailId}/>
                        </div>}
                        </div>
                </div>
                <div className='bot-right'>
                    <div className='static-map'></div>
                    <div className='nearby-trail'>
                        <NearbyTrails parkId={trail.parkId} trailId={trailId}/>
                    </div>
                </div>


            </div>

        </div>

    ));
}

export default TrailDetail;
