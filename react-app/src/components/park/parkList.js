import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAllparksThunk} from "../../store/park"

import DisplayRating from '../../helper/displayRating';


function ParkList() {
    const dispatch = useDispatch();
    const parks = useSelector(state => state.park);

    const [parksIsLoaded, setParksIsLoaded] = useState(false);
    const parksList = Object.values(parks);
    const [filter,setFilter] = useState([])
    const [active,setActive] = useState(0)

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);

    const states = ['AL','AK','AZ','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY']

  return (parksIsLoaded &&
    <div className='park-list-page-container'>
        <h2 style={{padding:'30px 30px 0 30px'}}>SELECT PARK BY STATE</h2>
        <div className='filter-container'>
            <button className={active === 0? 'active' : ''}
                onClick={()=>{
                setActive(0)
                setFilter(parksList)}}>All</button>
            {states.map((state,index)=>{
                return (<button className={active === (index+1)? 'active' : ''}
                    onClick={()=>{
                    setActive(index+1)
                    const selectedParks = parksList.filter((park)=> park.state == state).sort()
                    setFilter(selectedParks)
                
                }}>{state}</button>)
            })}
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
