import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAlltrailsThunk} from "../../store/trail"
import { Rating } from 'react-simple-star-rating'
import handleRating from '../../helper/StarConvert';

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
            <div className="img-container" key={trail.id}>
                <NavLink to={`/trails/${trail.id}`}>
                    <img className="trail-img" alt="" src={trail.preview_img}></img>
                </NavLink>
                <div className='park-list-content'>
                    <div className='trail-avg-rating'>
                        <Rating readonly={true} ratingValue={handleRating(trail.avgRating)} allowHalfIcon={true}/>
                            <span>{`Rating:${trail.avgRating}`}</span>
                    </div>
                <span>(</span>{trail.totalReviews}<span>)</span>
                <p>{trail.difficulty}</p>
                <p>{trail.name}</p>
                <p>{trail.length}</p>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default TrailList;
