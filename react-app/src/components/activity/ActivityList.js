import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import {getActivitiesThunk} from "../../store/activity"

import { Modal } from '../../context/Modal'

import DeleteActivityAlarm from '../form/deleteActivity';
import "../style/activity.css"


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

    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }


    return (activityIsLoaded
        &&
        <div className='activityList-container'>
            {activityList.map(activity => (
                <div className="activity-container">
                    <div className='top-box'>
                        <div className='activity-owner'>
                            <div className='user-pro'>
                                <img className="pro-img"
                                alt=""
                                src={activity.user.profileImg? activity.user.profileImg : defaultImg}
                                style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                                onError={imgError}
                                />
                            </div>
                            <div className='user-info'>
                                <p>{activity.user.username}</p>
                                <p>{activity.createdAt}</p>
                            </div>
                    {(session.id === activity.user.id) && (
                        <div className='button-group'>
                        {/* <Route path={`/trails/${trailId}/activities/${activity.id}`}>
                            Edit
                            <EditActivity />
                        </Route> */}
                        <Link className='link-tag' to={{ pathname: `/trails/${trailId}/activities/${activity.id}`, state: { activity } }}
                                    style={{
                                        textDecoration:'none',
                                        width:'80px',
                                        height:'25px',
                                        color:'#fff',
                                        background: '#868c4e',
                                        borderRadius:'10px',
                                        textAlign:'center',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent: 'center',
                                        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',

                                        fontSize: '12px',
                                        fontWeight:'600'

                                        }}>UPDATE</Link>


                        <button onClick={()=>setDeleteModal(true)}>Delete</button>
                                {deleteModal &&
                                    <Modal onClose={()=>setDeleteModal(false)} >
                                        <DeleteActivityAlarm hideModal={()=> setDeleteModal(false)} activity={activity} />
                                    </Modal>
                                }
                        </div>
                    )}
                    </div>
                </div>
                <div className='activity-route'>
                    <p style={{overflowWrap:'break-word'}}>{activity.name}</p>
                    <div className='rating-box'>
                    {/* <NavLink to={`/activities/${activity.id}`}> */}
                        <img className="activity-img" alt="" src={activity.staticMap}></img>
                    {/* </NavLink> */}
                    </div>

                </div>


        </div>))}
    </div>
      );


}
export default ActivityList;
