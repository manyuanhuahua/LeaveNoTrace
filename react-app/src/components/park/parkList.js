import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAllparksThunk} from "../../store/park"

function ParkList() {
    const dispatch = useDispatch();
    const parks = useSelector(state => state.park);
    // const session = useSelector(state => state.session.user);
    const [parksIsLoaded, setParksIsLoaded] = useState(false);
    const parksList = Object.values(parks);

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);


  return (parksIsLoaded &&
    <div className='parkList-container'>
        {parksList.map(park => (
            <div className="img-container" key={park.id}>
                <NavLink to={`/parks/${park.id}`}>
                    <img className="park-img" alt="" src={park.preview_img}></img>
                </NavLink>
                <p><span>{park.avgRating}</span><span>(</span>{park.totalReviews}<span>)</span></p>
                <p>{park.name}</p>
                <p>{park.state}</p>
                <p>{park.acreage}</p>
            </div>)
            )
        }
    </div>
  );
}

export default ParkList;
