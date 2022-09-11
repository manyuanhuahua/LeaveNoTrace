import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ParkList from '../park/parkList';
import TrailList from '../trail/trailList';
import "../style/park.css"
import "../style/explore.css"
import "../style/trail.css"
import Loader from '../loader/Loader';
import "../style/loader.css"








function Explore() {
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[]);


    return (
        <>
        {loading? (
            <div className='loader-container'>
                <Loader />
            </div>
            ) : (
            <div className='explore-container'>
            <div className='explore-parks'>
                <div className='park-list'>
                    <h2>Explore Parks</h2>
                </div>
                <div className='list-detail'>
                    <ParkList />
                </div>

            </div>
            <div className='explore-trails'>
                <h2>Explore Trails</h2>

                <TrailList />
            </div>
            </div>)




        }
    </>
    )}

export default Explore
