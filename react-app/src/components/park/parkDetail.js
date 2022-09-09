import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams} from "react-router-dom";
import {getParkDetailThunk,} from "../../store/park"
import {getParkTrailsThunk} from "../../store/trail"


function ParkDetail() {
    const dispatch = useDispatch();
    const {parkId} = useParams();
    const parkObj = useSelector(state => state.park);
    const trails = useSelector(state => state.trail);
    const trailsList = Object.values(trails);
    const park = Object.values(parkObj)[0];

    // const session = useSelector(state => state.session.user);
    const [parksIsLoaded, setParksIsLoaded] = useState(false);



    useEffect(() => {
        dispatch(getParkDetailThunk(parkId))
        .then(() => dispatch(getParkTrailsThunk(parkId)))
        .then(() => setParksIsLoaded(true));
    }, [dispatch,parkId]);




    return (parksIsLoaded &&
        <div className='park-detail-container'>
            <div className='park-detail-top-box'>
                <div className='pre-img'>
                    <img className='park-detail-preview-img' src={park.preview_img} alt=''/>
                </div>
                <h1>{park.name}</h1>
                <div className='park-avg-rating-reviews'>
                    <div className='park-avg-rating'>Rating:{park.avgRating}</div>
                    <div className='park-reviews'>{park.totalReviews} Review(s)</div>
                </div>
                <div className='detail-text'>{park.description}</div>
                <div className='static-map'></div>
            </div>
            <div className='park-detail-mid-box'>
                <h2>Park information</h2>
                <div className='info-box'>
                    <div className='acrage'>
                        <h4>Acreage:</h4>
                        <p>{park.acreage} acres</p>
                    </div>
                    <div className='contact'>
                        <h4>Contact:</h4>
                        <p>{park.contact}</p>
                    </div>
                    <div className='hours'>
                        <h4>Park hours:</h4>
                        <p>{park.park_hours}</p>
                    </div>
                    <div className='links'>
                        <a href={park.park_originlinks}>
                            Helper link
                        </a>
                    </div>
                </div>
            </div>
            <div className='park-detail-bom-box'>
                {trailsList.map((trail,indiex) => (
                    <div className="trail-box" key={trail.id}>
                    <NavLink to={`/trails/${trail.id}`}>
                        <div className='left-img'>
                            <img className="trail-img" alt="" src={trail.preview_img}></img>
                        </div>
                    </NavLink>
                        <div className='body-text'>
                            <h3>#{indiex + 1}- {trail.name}</h3>
                            <h4>{park.name}</h4>
                            <div className='content'>
                                <p>Difficulty: {trail.difficulty}</p>
                                <p>Avg Rating: {trail.avgRating}</p>
                                <p>({trail.totalReviews} Review(s))</p>
                                <p>Length: {trail.length} mi</p>
                            </div>
                        </div>

            </div>)
            )
        }
            </div>
        </div>
      );
}

export default ParkDetail;
