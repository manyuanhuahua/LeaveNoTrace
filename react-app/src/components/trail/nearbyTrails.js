import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getNearbyTrailsThunk} from "../../store/trail"
import { Rating } from 'react-simple-star-rating'
import handleRating from '../../helper/StarConvert';
import "../style/trail.css"
import { useHistory } from 'react-router-dom';


function NearbyTrails({parkId,trailId}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const trails = useSelector(state => state.nearby);
    const trailsList = Object.values(trails);
    // const session = useSelector(state => state.session.user);
    const [trailsIsLoaded, setTrailsIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getNearbyTrailsThunk(parkId,trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,parkId,trailId]);




  return (trailsIsLoaded &&
    <div className='nearby-trailList-container'>
        <h3>Nearby Trails({trailsList.length})</h3>
        {trailsList.map(trail =>
            (<div className="nearby-trail-box" key={trail.id} onClick={() => history.push(`/trails/${trail.id}`)}>
                <div className='img-box'>
                    <img className="nearby-trail-img" alt="" src={trail.preview_img}></img>


                    <div className='detail-content'>
                        <h3>{trail.name}</h3>
                        <p>Difficulty: {trail.difficulty}</p>
                        <p>Length: {trail.length} mi</p>
                        <p>({trail.totalReviews} Review(s))</p>
                        <div className='trail-avg-rating'>
                            {/* <Rating readonly={true} ratingValue={handleRating(trail.avgRating)} allowHalfIcon={true}/> */}
                                <span>{`Rating:${trail.avgRating}`}</span>
                        </div>
                    </div>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default NearbyTrails;
