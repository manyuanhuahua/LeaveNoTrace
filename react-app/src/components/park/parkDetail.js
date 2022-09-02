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
        <div className='main-container'>
            <div className='top-box'>
                <div className='pre-img'></div>
                <div className='detail-text'></div>
                <div className='static-map'></div>
            </div>
            <div className='mid-box'>
                <h2>Park information</h2>
                <div className='infor-box'>
                    <div className='acrage'>
                        <h4>Acreage:</h4>
                        <p>{park.acreage}</p>
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
            <div className='bom-box'>
                {trailsList.map((trail,indiex) => (
                    <div className="trail-box" key={trail.id}>
                    <NavLink to={`/trails/${trail.id}`}>
                        <div className='left-img'>
                            <img className="trail-img" alt="" src={trail.preview_img}></img>
                        </div>
                        <div className='right-text'>
                        <p><span>{trail.difficulty}</span><span>{trail.avgRating}</span><span>(</span>{trail.totalReviews}<span>)</span></p>
                        <h4>#{indiex}-{trail.name}</h4>
                        <p>{park.name}</p>
                        <p>{trail.length}</p>
                        </div>
                    </NavLink>
            </div>)
            )
        }
            </div>
        </div>
      );
}

export default ParkDetail;
