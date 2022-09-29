import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAllparksThunk} from "../../store/park"
import {getAlltrailsThunk} from "../../store/trail"


import DisplayRating from '../../helper/displayRating';

import "../style/park.css"
import "../style/explore.css"
import Loader from '../loader/Loader';
import "../style/loader.css"








function Explore() {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const parks = useSelector(state => state.park);
    const parksList = Object.values(parks);

    const [dataLoaded, setDataIsLoaded] = useState(false);
    const trails = useSelector(state => state.trail);


    const trailsList = Object.values(trails);
    const [parkFilter,setParkFilter] = useState([])
    const [trailFilter,setTrailFilter] = useState([])
    const [parkActive,setParkActive] = useState(0)
    const [trailActive,setTrailActive] = useState(0)


    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[]);

    useEffect(() => {
        dispatch(getAllparksThunk())
        .then(()=>dispatch(getAlltrailsThunk()))
        .then(() => setDataIsLoaded(true));
    }, [dispatch]);

    return (
        <>
        {loading ? (
            <div className='loader-container'>
                <Loader />
            </div>
            ) : dataLoaded && (
            <div className='explore-container'>
            <div className='explore-parks'>
                <div className='list-detail'>
                <div className='parkList-container'>
                <div className='park-list'>
                    <h2 style={{textAlign:'center',padding:'30px 0 10px 0',borderBottom:'1px solid #5d655f',marginLeft:'40px'}}>Explore Parks</h2>
                    <div className='filter-container'>
                        <button className={parkActive === 0? 'active' : ''}
                            onClick={()=>{
                            setParkActive(0)
                            setParkFilter(parksList)}}>All</button>
                        <button className={parkActive === 1? 'active' : ''}
                            onClick={()=>{
                            setParkActive(1)
                            const high = parksList.filter((park)=> park.avgRating > 4).slice(0,12).sort()
                            setParkFilter(high)}}>Highest Rank</button>
                        <button className={parkActive === 2? 'active' : ''}
                            onClick={()=>{
                            setParkActive(2)
                            const most = parksList.sort((a, b) => (a.totalReviews > b.totalReviews) ? -1 : 1).slice(0,12)
                            setParkFilter(most)}}>Most Reviewed</button>
                    </div>
                </div>
                <div className='park-list-main' >
                {parkFilter.length < 1? parksList.map(park => (
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
                    ): parkFilter.map(park => (
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


                <div className='trailList-container'>
                <div className='trail-list'>
                    <h2 style={{textAlign:'center',padding:'30px 0 10px 0',borderBottom:'1px solid #5d655f',marginLeft:'40px'}}>Explore Trails</h2>
                    <div className='filter-container'>
                        <button className={trailActive === 0? 'active' : ''}
                            onClick={()=>{
                            setTrailActive(0)
                            setTrailFilter(trailsList)}}>All</button>
                        <button className={trailActive === 1? 'active' : ''}
                            onClick={()=>{
                            setTrailActive(1)
                            const high = trailsList.filter((park)=> park.avgRating > 4).slice(0,12).sort()
                            setTrailFilter(high)}}>Highest Rank</button>
                        <button className={trailActive === 2? 'active' : ''}
                            onClick={()=>{
                            setTrailActive(2)
                            const most = trailsList.sort((a, b) => (a.totalReviews > b.totalReviews) ? -1 : 1).slice(0,12)
                            setTrailFilter(most)}}>Most Reviewed</button>
                    </div>
                </div>
                <div className='trail-list-main' >
                {trailFilter.length < 1? trailsList.map(trail => (
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
                    ): trailFilter.map(trail => (
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
    </div>
    </div>





            </div>

            </div>)




        }
    </>
    )}

export default Explore
