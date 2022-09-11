import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAlltrailsThunk} from "../../store/trail"
import Loader from '../loader/Loader';
import {FaStar,FaStarHalf} from 'react-icons/fa'
import DisplayRating from '../../helper/displayRating';



function TrailList() {
    const dispatch = useDispatch();
    const trails = useSelector(state => state.trail);
    // const session = useSelector(state => state.session.user);
    const [trailsIsLoaded, setTrailsIsLoaded] = useState(false);
    const trailsList = Object.values(trails);

    useEffect(() => {
        dispatch(getAlltrailsThunk()).then(() => setTrailsIsLoaded(true));
    }, [dispatch]);

    if(!trailsList){
        return <Loader />
    }

  return (trailsIsLoaded &&
    <div className='trailList-container'>
        {trailsList.map(trail => (
            <div className="card-container" key={trail.id}>
                <NavLink to={`/trails/${trail.id}`} style={{textDecoration:'none',textAlign:'center',color:'#333'}}>
                    <div className='img-box'>
                        <img className="trail-img" alt="" src={trail.preview_img}></img>
                    <h4>{trail.name}</h4>
                    </div>
                </NavLink>
                <div className='trail-list-content'>
                    <div className='trail-avg-rating'>
                    <DisplayRating rating={trail.avgRating} />
                    <p>{`${trail.avgRating}`}</p>
                    </div>
                <div className='trail-summary'>
                    <p>Total Reviews: {trail.totalReviews}</p>
                    <p>Difficuly: {trail.difficulty}</p>
                    <p>{trail.length} mi</p>
                </div>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default TrailList;
