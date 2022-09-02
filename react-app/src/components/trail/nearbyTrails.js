import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getNearbyTrailsThunk} from "../../store/trail"

function NearbyTrails({parkId,trailId}) {
    const dispatch = useDispatch();
    const trails = useSelector(state => state.nearby);
    const trailsList = Object.values(trails);
    // const session = useSelector(state => state.session.user);
    const [trailsIsLoaded, setTrailsIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getNearbyTrailsThunk(parkId,trailId)).then(() => setTrailsIsLoaded(true));
    }, [dispatch,parkId,trailId]);



  return (trailsIsLoaded &&
    <div className='trailList-container'>
        {trailsList.map(trail =>
            (<div className="trail-box" key={trail.id}>
                <div className='top-img'>
                    <img className="trail-img" alt="" src={trail.preview_img}></img>
                </div>
                <div className='bot-text'>
                    <p><span>{trail.difficulty}</span><span>{trail.avgRating}</span><span>(</span>{trail.totalReviews}<span>)</span></p>
                    <p>{trail.park.name}</p>
                    <p>{trail.length}</p>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default NearbyTrails;
