import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getNearbyTrailsThunk} from "../../store/trail"

import "../style/trail.css"
import { useHistory } from 'react-router-dom';
import DisplayRating from '../../helper/displayRating';


function NearbyTrails({parkId,trailId}) {
    const history = useHistory()
    const dispatch = useDispatch();
    const trails = useSelector(state => state.nearby);
    const trailsList = Object.values(trails);

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
                        <div className='trail-avg-rating' style={{margin:'0px 0px 3px 10px'}}>
                            <DisplayRating rating={trail.avgRating} />
                            
                            <span style={{marginLeft:'5px'}}>{(trail.avgRating).toFixed(2)}</span>
                        </div>
                        <p>{trail.totalReviews} Review(s)</p>
                    </div>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default NearbyTrails;
