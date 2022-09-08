import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EditReviewModal from '../modals/EditReviewModal';
import DeleteReviewModal from '../modals/DeleteReviewModal';
import {getReviewsThunk} from "../../store/review"
import { Rating } from 'react-simple-star-rating'
import StaticMap from '../map/StaticMap';


function ActivityList({trailId}) {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const session = useSelector(state => state.session.user);
    const activityList = Object.values(activities);
    const [activitiesIsLoaded, setActivitiesIsLoaded] = useState(false);



    useEffect(() => {
        dispatch(getActivitiesThunk(trailId)).then(() => setActivitiesIsLoaded(true));
    }, [dispatch,trailId,editModal]);





  return (activitiesIsLoaded &&
    <div className='parkList-container'>
        {activityList.map(activity => (
            <div className="activity-container">
                <div className='activity-owner'>
                    <div className='user-pro'>
                        <img className='pro-img' alt='' src={activity.user.profileImage}/>
                    </div>
                    <div className='user-info'>
                        <p>{activity.user.username}</p>
                        <p>{activity.createdAt}</p>
                    </div>
                </div>
                <div className='static-map'>
                    <StaticMap />
                    {activity.staticMap}</div>

            </div>)
            )
        }
    </div>
  );
}

export default ActivityList;
