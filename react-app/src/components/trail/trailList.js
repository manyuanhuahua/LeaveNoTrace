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

    const handleRating = (rating) => {
        let res
        if (rating === 5){
            res = 100
        }else if(rating === 4){
            res = 80
        }else if(rating === 3){
            res = 60
        }else if(rating === 2){
            res = 40
        }else{
            res = 20
        }
        return res
    }

  return (trailsIsLoaded &&
    <div className='trailList-container'>
        {trailsList.map(trail => (
            <div className="trail-img" key={trail.id}>
                <NavLink to={`/trails/${trail.id}`}>
                    <img className="trail-img" alt="" src={trail.preview_img}></img>
                </NavLink>
                <p>

                    <div className='trail-avg-rating'>
                        <Rating readonly={true} ratingValue={handleRating(trail.avgRating)}/>
                            <span>{`Rating:${trail.avgRating}`}</span>

                    </div>
                <span>(</span>{trail.totalReviews}<span>)</span></p>
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
