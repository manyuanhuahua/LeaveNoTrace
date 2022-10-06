import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAlltrailsThunk} from "../../store/trail"

import DisplayRating from '../../helper/displayRating';
import "../style/trail.css"



function TrailList() {
    const dispatch = useDispatch();
    const trails = useSelector(state => state.trail);

    const [trailsIsLoaded, setTrailsIsLoaded] = useState(false);
    const trailsList = Object.values(trails);
    const [filter,setFilter] = useState([])
    const [active,setActive] = useState(0)

    useEffect(() => {
        dispatch(getAlltrailsThunk()).then(() => setTrailsIsLoaded(true));
    }, [dispatch]);


    const tags =['forest','waterfall','dog friendly','no dogs','views','wildflowers','beach','hot springs','historic site','fee']

  return (trailsIsLoaded &&
    <div className='trail-List-page-container'>
        <h2 style={{padding:'30px 30px 0 30px'}}>SELECT TRAIL BY TAG</h2>
        <div className='filter-container'>
            <button className={active === 0? 'active' : ''}
                onClick={()=>{
                setActive(0)
                setFilter(trailsList)}}>All</button>
            {tags.map((tag,index)=>{
                return (<button className={active === (index+1)? 'active' : ''}
                    onClick={()=>{
                    setActive(index+1)
                    const selectedTrails = trailsList.filter((trail)=> (trail.tags).indexOf(tag) !== -1).sort()
                    setFilter(selectedTrails)
                 
                }}>{tag}</button>)
            })}
        </div>
        <div className='trail-list-main' >
        {filter.length < 1? trailsList.map(trail => (
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
                    <p>{(trail.avgRating).toFixed(2)}</p>
                    </div>
                <div className='trail-summary'>
                    <p>Total Reviews: {trail.totalReviews}</p>
                    <p>Difficuly: {trail.difficulty}</p>
                    <p>{trail.length} mi</p>
                </div>
                </div>
            </div>)
            ): filter.map(trail => (
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
                    <p>{(trail.avgRating).toFixed(2)}</p>
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
    </div>
  );
}

export default TrailList;
