import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link} from "react-router-dom";
import {getActivitiesThunk} from "../../store/activity"

import { Modal } from '../../context/Modal'

import DeleteActivityAlarm from '../form/deleteActivity';




function ActivityList({trailId}) {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activity);
    const session = useSelector(state => state.session.user);
    const [activityIsLoaded, setActivityIsLoaded] = useState(false);
    const activityList = Object.values(activities).reverse()
    const [deleteModal, setDeleteModal] = useState(false);




    useEffect(() => {
        dispatch(getActivitiesThunk(trailId)).then(() => setActivityIsLoaded(true));
    }, [dispatch,trailId]);
    // console.log('activities--------',activityList)
    return (activityIsLoaded
        &&
        <div className='activityList-container'>
            {activityList.map(activity => (
                <div className="img-container" key={activity.id}>
                    <NavLink to={`/activities/${activity.id}`}>
                        <img className="activity-img" alt="" src={activity.staticMap}></img>
                    </NavLink>
                    <img className="activity-user-profile" alt="" src={activity.user.profileImg}></img>
                    <p>{activity.user.name}</p>
                    <p>{activity.createdAt}</p>
                    {(session.id === activity.user.id) && (
                        <>
                        {/* <Route path={`/trails/${trailId}/activities/${activity.id}`}>
                            Edit
                            <EditActivity />
                        </Route> */}
                        <Link to={{ pathname: `/trails/${trailId}/activities/${activity.id}`, state: { activity } }}
                                    >Update</Link>


                        <button onClick={()=>setDeleteModal(true)}>Delete</button>
                                {deleteModal &&
                                    <Modal onClose={()=>setDeleteModal(false)} >
                                        <DeleteActivityAlarm hideModal={()=> setDeleteModal(false)} activity={activity} />
                                    </Modal>
                                }
                        </>
                    )}


                </div>)
                )
            }
        </div>
      );


}
export default ActivityList;
