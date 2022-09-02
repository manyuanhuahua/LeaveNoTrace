import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAlltrailsThunk} from "../../store/trail"

function TrailList() {
    const dispatch = useDispatch();
    const trails = useSelector(state => state.trail);
    // const session = useSelector(state => state.session.user);
    const [trailsIsLoaded, setTrailsIsLoaded] = useState(false);
    const trailsList = Object.values(trails);

    useEffect(() => {
        dispatch(getAlltrailsThunk()).then(() => setTrailsIsLoaded(true));
    }, [dispatch]);


  return (trailsIsLoaded &&
    <div className='trailList-container'>
        {trailsList.map(trail => (
            <div className="trail-img">
                <NavLink to={`/trails/${trail.id}`}>
                    <img className="trail-img" alt="" src={trail.preview_img}></img>
                </NavLink>
                <p><span>{trail.avgRating}</span><span>(</span>{trail.totalReviews}<span>)</span></p>
                <p>{trail.difficulty}</p>
                <p>{trail.name}</p>
                <p>{trail.length}</p>
            </div>)
            )
        }
    </div>
  );
}

export default TrailList;
