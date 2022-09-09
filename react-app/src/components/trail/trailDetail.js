import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link} from "react-router-dom";
import {getTrailDetailThunk} from "../../store/trail"
import CreateReviewModal from '../modals/CreateReviewModal';
import ReviewList from '../review/reviewList';
import NearbyTrails from './nearbyTrails';
import ActivityList from '../map/ActivityList';
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





    useEffect(() => {
        dispatch(getTrailDetailThunk(trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,trailId]);

    if(!trail){
        return null
    }






    return (trailIsLoaded && trail && (
        <div className='trail-detail-main-container'>
            <div className='trail-detail-top-box'>
                <div className='trail-detail-pre-img'>
                    <img className='trail-preview' src={trail.preview_img} alt='' />
                </div>
                <h1>{trail.name}</h1>
                <div className='rate'>
                    <p>Difficulty: {trail.difficulty}</p>
                    <p>Total Reviews: {trail.totalReviews}</p>
                    <p>{trail.parkName}</p>
                </div>
            </div>
            <div className='mid-box'>


                        <div className='description'>
                            <p>{trail.description}</p>
                        </div>
                        <div className='info'>
                            <div className='len'>
                                <p className='p-title'>Length</p>
                                <p>{trail.length}mi</p>
                            </div>
                            <div className='ele'>
                                    <p className='p-title'>Elevation gain</p>
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
                            <div className='rate-display'>
                                <h1>{trail.avgRating}</h1>
                                <p>{trail.totalReviews} Review(s)</p>
                            </div>
                            <div className='create-button'>
                                <div className='create-review'>
                                    <CreateReviewModal trail={trail} createModal={createModal} setCreateModal={setCreateModal} />
                                </div>
                                <div className='create-review'>
                                    <Link to={`/trails/${trail.id}/activities/new`} trail={trail} exact="true" style={{textDecoration: 'none', color:'#fff'}} >
                                        Create map
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='left-list-box'>
                        {showReview && <div className='review-list'>
                            <ReviewList trailId={trailId}/>
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
