import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import {getTrailDetailThunk} from "../../store/trail"
import CreateReviewModal from '../modals/CreateReviewModal';
import ReviewList from '../review/reviewList';
import NearbyTrails from './nearbyTrails';

function TrailDetail() {
    const dispatch = useDispatch();
    const {trailId} = useParams();
    const trailObj = useSelector(state => state.trail);
    const trail = Object.values(trailObj)[0];
    // const session = useSelector(state => state.session.user);
    const [trailIsLoaded, setTrailsIsLoaded] = useState(false);
    const [createModal, setCreateModal] = useState(false);



    useEffect(() => {
        dispatch(getTrailDetailThunk(trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,trailId]);





    return (trailIsLoaded &&
        <div className='main-container'>
            <div className='top-box'>
                <div className='pre-img'>
                    <img className='trail-preview' src={trail.preview_img} alt='' />
                </div>
                <h2>{trail.name}</h2>
                <div className='rate'>
                <p>{trail.difficulty}</p>
                <p><span>(</span>{trail.totalReviews}<span>)</span></p>
                </div>
                <p>{trail.parkName}</p>
            </div>
            <div className='mid-box'>
                <div className='mid-left'>
                    <div className='trail-content'>
                        <div className='description'>
                            <p>{trail.description}</p>
                        </div>
                        <div className='info'>
                            <div className='len'>
                                <p>Length</p>
                                <p>{trail.length}mi</p>
                            </div>
                            <div className='ele'>
                                <p>Elevation gain</p>
                                <p>{trail.elevation}ft</p>
                            </div>
                            <div className='diff'>
                                <p>Difficulty</p>
                                <p>{trail.difficulty}</p>
                            </div>
                        </div>
                        <div className='tags'>

                            {trail.tags.map((tag,index)=>(
                                <p key={index}>{tag}</p>
                            ))}
                        </div>

                    </div>
                    <div className='review-activity-bar'>
                        <div className='nav-bar'>
                            <div className='bar-review'>
                                <p>Review(<span>{trail.totalReviews}</span>)</p>
                            </div>
                            <div className='bar-activity'>
                                <p>Activities(<span>{trail.totalActivities}</span>)</p>
                            </div>
                        </div>
                        <div className='rate-display'>
                            <h1>{trail.avgRating}</h1>
                            <p>{trail.totalReviews}Review(s)</p>
                        </div>
                        <button className='write-review' onClick={() => setCreateModal(true)}>
                                {createModal && <CreateReviewModal trail={trail} setShowModal={setCreateModal} />}
                                Write review
                        </button>

                    </div>
                    <div className='review-list'>
                        <ReviewList trailId={trailId}/>
                    </div>

                </div>
                <div className='mid-right'>
                    <div className='static-map'></div>
                    <div className='nearby-trail'>
                        <NearbyTrails parkId={trail.parkId} trailId={trailId}/>
                    </div>



                </div>
            </div>
        </div>

      );
}

export default TrailDetail;
