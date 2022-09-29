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
    const [filter,setFilter] = useState([])
    const [active,setActive] = useState(0)

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);



  return (parksIsLoaded &&
    <div className='parkList-container'>
        <div className='filter-container'>
            <button className={active === 0? 'active' : ''}
                onClick={()=>{
                setActive(0)
                setFilter(parksList)}}>All</button>
            <button className={active === 1? 'active' : ''}
                onClick={()=>{
                setActive(1)
                const high = parksList.filter((park)=> park.avgRating > 4).slice(0,12).sort()
                setFilter(high)}}>Highest Rank</button>
            <button className={active === 2? 'active' : ''}
                onClick={()=>{
                setActive(2)
                const most = parksList.sort((a, b) => (a.totalReviews > b.totalReviews) ? -1 : 1).slice(0,12)
                setFilter(most)}}>Most Reviewed</button>
        </div>
        <div className='park-list-main' >
        {filter.length < 1? parksList.map(park => (
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
            ): filter.map(park => (
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
    </div>
  );
}

export default ParkList;
