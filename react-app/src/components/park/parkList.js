import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAllparksThunk} from "../../store/park"

import DisplayRating from '../../helper/displayRating';


function ParkList() {
    const dispatch = useDispatch();
    const parks = useSelector(state => state.park);
    // const session = useSelector(state => state.session.user);
    const [parksIsLoaded, setParksIsLoaded] = useState(false);
    const parksList = Object.values(parks);

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);


    // const [loading,setLoading] = useState(false)

    // useEffect(()=>{
    //     setLoading(true)
    //     setTimeout(()=>{
    //         setLoading(false);
    //     },2000)
    // },[]);

  return (parksIsLoaded &&
    <div className='parkList-container'>
        {parksList.map(park => (
            <div className="card-container" key={park.id}>

                <NavLink to={`/parks/${park.id}`} style={{textDecoration:'none',textAlign:'center',color:'#333'}}>
                    <div className='img-box'>
                        <img className="park-img" alt="" src={park.preview_img}></img>
                    <h4 >{park.name}</h4>
                    </div>
                </NavLink>
                <div className='park-list-content'>
                <div className='park-avg-rating'>
                    <DisplayRating rating={park.avgRating} />
                    <p>{(park.avgRating).toFixed(2)}</p>
                    </div>
                <div className='park-summary'>
                <p>{park.state}</p>
                <p>{park.acreage} acres</p>
                </div>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default ParkList;
