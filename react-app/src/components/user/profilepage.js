import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useParams,Link} from "react-router-dom";
import { getUserActivitiesThunk } from '../../store/activity';
import { getUserPhotosThunk } from '../../store/photo';
import { getUserReviewsThunk } from '../../store/review';
import bg from "../../assets/profilebarbg.jpg"
import icon from "../../assets/listicon.jpg"
import {getListsThunk} from "../../store/list"
import {FaStar} from 'react-icons/fa'

import { Modal } from '../../context/Modal'
import CreateListModal from '../modals/CreateListModal';
import EditReviewForm from '../form/editReview';
import DeleteListAlarm from '../form/deleteList';
import DeleteReviewAlarm from '../form/deleteReview';
import EditListForm from '../form/editList';
import DeletePhotoAlarm from '../form/deletePhoto';
import DeleteActivityAlarm from '../form/deleteActivity';

import "../style/photo.css"
import "../style/activity.css"
import "../style/profile.css"
import "../style/review.css"


function UserDetail() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const session = useSelector(state => state.session.user);
    const activities = useSelector(state => state.activity);
    const activityList = Object.values(activities).reverse()
    const photos = useSelector(state => state.photo);
    const photoList = Object.values(photos).reverse()
    const reviews = useSelector(state => state.review);
    const reviewsList = Object.values(reviews).reverse();
    const lists = useSelector(state=>state.list)
    const listsList = Object.values(lists).reverse()
    const [reviewIsLoaded,setReviewIsLoaded] = useState(false)
    const [photoIsLoaded,setPhotoIsLoaded] = useState(false)
    const [activityIsLoaded,setActivityIsLoaded] = useState(false)
    const [listIsLoaded,setListIsLoaded] = useState(false)
    const [filter,setFilter] = useState([])
    const [active,setActive] = useState(0)
    const [deleteActivityModal, setDeleteActivityModal] = useState(false);
    const [deletePhotoModal, setDeletePhotoModal] = useState(false);
    const [deleteReviewModal, setDeleteReviewModal] = useState(false);
    const [editReviewModal, setEditReviewModal] = useState(false);
    const [createListModal, setCreateListModal] = useState(false);
    const [editListModal, setEditListModal] = useState(false);
    const [deleteListModal, setDeleteListModal] = useState(false);


    const [selected,setSelected] = useState(null)

    useEffect(() => {
        dispatch(getUserReviewsThunk(userId))
            .then(() => setReviewIsLoaded(true));
    }, [dispatch,userId,editReviewModal,deleteReviewModal]);

    useEffect(() => {
        dispatch(getUserPhotosThunk(userId))
            .then(() => setPhotoIsLoaded(true));
    }, [dispatch,userId,deletePhotoModal]);

    useEffect(() => {
        dispatch(getUserActivitiesThunk(userId))
            .then(() => setActivityIsLoaded(true));
    }, [dispatch,userId,deleteActivityModal]);

    useEffect(() => {
        dispatch(getListsThunk(userId))
            .then(() => setListIsLoaded(true));
    }, [dispatch,userId,editListModal,deleteListModal,createListModal]);


    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

    return reviewIsLoaded && photoIsLoaded && activityIsLoaded && listIsLoaded && (
        <div className='user-profile-container'>
            <div className='left-sidebar'>
                <div className='sidebar-profile-box'>
                    <div className='cover-img'>
                        <img src={bg}  alt=''/>
                    </div>
                    <div className='sidebar-profile-info'>
                        <img src={session.profileImg? session.profileImg : defaultImg}  alt='' onError={imgError}/>
                        <h1>{session.username}</h1>
                        <CreateListModal createListModal={createListModal} setCreateListModal={setCreateListModal}/>
                        <div className='user-detail'>
                            <p>Stats:</p>
                            <p>Total Activities: {session.totalActivities}</p>
                            <p> Total Photos: {session.totalPhotos} </p>
                            <p>Total Reviews: {session.totalReview} </p>
                            <p>Total Lists: {session.totalLists}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='right-sidebar'></div>

                <div className='select-bar'>
                        <button className={active === 0? 'active' : ''}
                            onClick={()=>{
                            setActive(0)
                            setFilter(listsList)}}>List</button>
                        <button className={active === 1? 'active' : ''}
                            onClick={()=>{
                            setActive(1)
                            setFilter(activityList)}}>Activity</button>
                        <button className={active === 2? 'active' : ''}
                            onClick={()=>{
                            setActive(2)
                            setFilter(photoList)}}>Photo</button>
                        <button className={active === 3? 'active' : ''}
                            onClick={()=>{
                            setActive(3)
                            setFilter(reviewsList)}}>Review</button>
                </div>
                <div className='profile-selected-list-container'>
                    {active === 0 ?
                        listsList.map((list,index)=>(
                            <div className='list-selected-container' key={index}>
                                <div className='selected-img'>
                                    <img src={list.content[0]? list.content[0].preview_img : icon} alt='' style={{width:'100px',height:'100px'}}/>
                                    <p>{list.name}</p>
                                    <div className='button-group'>
                                        <div className='edit-button'onClick={()=>{
                                            setSelected(list);
                                            setEditListModal(true)}}
                                            style={{width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            marginRight:'10px',
                                            border:'none'}}
                                            ><i className="fa-solid fa-pen" ></i></div>
                                            {editListModal &&
                                                (
                                                <Modal onClose={()=>setEditListModal(false)}>
                                                    <EditListForm selectedList={selected} hideModal={()=>setEditListModal(false)} />
                                                </Modal>
                                            )
                                        }
                                    <div className='delete-button'
                                        onClick={()=>{setSelected(list);setDeleteListModal(true)}}
                                        style={{textDecoration:'none',
                                            width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            border:'none'
                                            }}
                                        ><i className="fa-solid fa-trash-can" ></i></div>
                                        {deleteListModal &&
                                            <Modal onClose={()=>setDeleteListModal(false)} >
                                                <DeleteListAlarm hideModal={()=> setDeleteListModal(false)} list={selected} />
                                            </Modal>
                                        }

                                    </div>
                                </div>
                                <div className='list-detail'>

                                            {list.content.map((li,index)=>{
                                               return (
                                                <div className='list-data'>
                                                     <NavLink key={li.id} to={`/trails/${li.id}`} style={{textDecoration:'none',color:'#333'}}>
                                                        <p>{index+1} - <span>{li.name}</span></p>
                                                     </NavLink>
                                                </div>
                                                )
                                            }
                                            )}

                                </div>
                            </div>
                        ))


                    :(<></>)
                    }
                    {active === 1 ?
                        filter.map((activity,index)=>(
                            <div className='activity-selected-container' key={index}>
                                <div className='selected-img'>
                                    <img src={activity.staticMap} alt='' style={{width:'80px',height:'80px'}}/>
                                    <div className='detail-stats'>
                                        <h3>{activity.name}</h3>
                                        <p>{activity.trail.name}</p>
                                        <p>Distance: {activity.distance}</p>
                                        <p>Duration: {activity.duration}</p>
                                    </div>
                                </div>
                                <div className='button-group'>
                                    <Link className='link-tag' to={{ pathname: `/trails/${activity.trail.id}/activities/${activity.id}`, state: { activity } }}
                                        style={{
                                            textDecoration:'none',
                                            width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            marginRight:'10px',
                                        }}><i className="fa-solid fa-pen" ></i></Link>


                                        <button onClick={()=>setDeleteActivityModal(true)}
                                            style={{textDecoration:'none',
                                            width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            border:'none'
                                            }}

                                        ><i className="fa-solid fa-trash-can" ></i></button>
                                        {deleteActivityModal &&
                                            <Modal onClose={()=>setDeleteActivityModal(false)} >
                                                <DeleteActivityAlarm hideModal={()=> setDeleteActivityModal(false)} activity={activity} />
                                            </Modal>
                                        }

                                </div>
                            </div>
                        ))


                    :(<></>)
                    }
                    {active === 2 ?
                        filter.map((photo,index)=>(
                            <div className='photo-selected-container' key={index}>
                                <div className='selected-img'>
                                    <img src={photo.url} alt='' style={{width:'80px',height:'80px'}}/>
                                    <div className='detail-stats'>
                                        <h4>{photo.trail.name}</h4>
                                    </div>
                                </div>
                                <div className='button-group'>
                                    <button onClick={()=>setDeletePhotoModal(true)}
                                            style={{textDecoration:'none',
                                            width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            border:'none'
                                            }}

                                        ><i className="fa-solid fa-trash-can" ></i></button>
                                        {deletePhotoModal &&
                                        <Modal onClose={()=>setDeletePhotoModal(false)} >
                                            <DeletePhotoAlarm hideModal={()=>setDeletePhotoModal(false)} photo={photo} />
                                        </Modal>
                                    }
                                </div>
                            </div>
                        ))


                    :(<></>)
                    }
                    {active === 3 ?
                        filter.map((review,index)=>(
                            <div className='review-selected-container' key={index}>
                                <div className='selected-img'>
                                    <img src={review.trailPreview} alt='' style={{width:'80px',height:'80px'}}/>
                                    <div className='detail-stats'>
                                        <h4>{review.trailName}</h4>
                                        <div className='rating'>
                                        {[...Array(5)].map((star,i)=>{
                                            const ratingValue = i + 1
                                            return (
                                                <FaStar className='star'
                                                size={20}
                                                color={ratingValue <= review.rating ? '#688E4E' : '#e4e5e9'}
                                                />)
                                            })}
                                        </div>
                                        <p>{review.content}</p>

                                    </div>
                                </div>
                                <div className='button-group' >
                                <div className='modal' style={{display:'flex'}}>
                                    <div className='edit-button'onClick={()=>{
                                        setSelected(review);
                                        setEditReviewModal(true)}}
                                        style={{width:'30px',
                                        height:'25px',
                                        color:'#fff',
                                        background: '#868c4e',
                                        borderRadius:'10px',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent: 'center',
                                        marginRight:'10px',
                                        border:'none'}}
                                        ><i className="fa-solid fa-pen" ></i></div>
                                        {editReviewModal &&
                                            (
                                            <Modal onClose={()=>setEditReviewModal(false)}>
                                                <EditReviewForm selectedReview={selected} hideModal={()=>setEditReviewModal(false)} />
                                            </Modal>
                                        )
                                    }
                                    <div className='delete-button'
                                        onClick={()=>{setSelected(review);setDeleteReviewModal(true)}}
                                        style={{textDecoration:'none',
                                            width:'30px',
                                            height:'25px',
                                            color:'#fff',
                                            background: '#868c4e',
                                            borderRadius:'10px',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent: 'center',
                                            border:'none'
                                            }}
                                        ><i className="fa-solid fa-trash-can" ></i></div>
                                        {deleteReviewModal &&
                                            <Modal onClose={()=>setDeleteReviewModal(false)} >
                                                <DeleteReviewAlarm hideModal={()=> setDeleteReviewModal(false)} review={selected} />
                                            </Modal>
                                        }

                                    </div>
                                </div>
                            </div>
                        ))


                    :(<></>)
                    }

                </div>
        </div>
    )

}

export default UserDetail
