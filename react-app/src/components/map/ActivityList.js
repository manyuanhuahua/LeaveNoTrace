import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams} from "react-router-dom";
import {getActivitiesThunk} from "../../store/activity"



function ActivityList() {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const activities = useSelector(state => state.activities);
    // const session = useSelector(state => state.session.user);
    const [activityIsLoaded, setActivityIsLoaded] = useState(false);
    const activityList = Object.values(activities);


    useEffect(() => {
        dispatch(getActivitiesThunk(trailId)).then(() => setActivityIsLoaded(true));
    }, [dispatch]);

    return (activityIsLoaded &&
        <div className='activityList-container'>
            {activityList.map(activity => (
                <div className="img-container" key={activity.id}>
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
export default ActivityList;
