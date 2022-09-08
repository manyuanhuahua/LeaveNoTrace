import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link} from "react-router-dom";
import ParkList from '../park/parkList';
import TrailList from '../trail/trailList';
import "../style/park.css"
import "../style/explore.css"
import "../style/trail.css"






function Explore() {



    return (
        <>
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

        </>
    )
}

export default Explore
