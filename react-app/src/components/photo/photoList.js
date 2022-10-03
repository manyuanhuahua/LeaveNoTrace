import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link} from "react-router-dom";
import { getPhotosThunk } from '../../store/photo';

import { Modal } from '../../context/Modal'

import DeletePhotoAlarm from '../form/deletePhoto';
import "../style/activity.css"




function PhotoList({trailId}) {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photo);
    const session = useSelector(state => state.session.user);
    const [photoIsLoaded, setPhotoIsLoaded] = useState(false);
    const photoList = Object.values(photos).reverse()
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({})


    const formatedDate = (time) =>{
        const createDate = new Date(time)
        const date = createDate.getDate()
        const month = createDate.getMonth()+1
        const year = createDate.getFullYear()
        return `${month}/${date}/${year}`
    }



    useEffect(() => {
        dispatch(getPhotosThunk(trailId)).then(() => setPhotoIsLoaded(true));
    }, [dispatch,trailId]);

    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }



    // console.log('activities--------',activityList)
    return (photoIsLoaded
        &&
        <div className='photoList-container'>
            {photoList.map(photo => (
                <div className="photo-container">
                    <div className='top-box' onClick={()=>setShowModal(true)}>
                        <img src={photo.url} alt=''/>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <div className='display-photo'>
                                <img src={photo.url} alt=''/>
                            </div>
                        </Modal>
                        )}
                    <div className='photo-owner'>
                        <div className='user-pro'>

                            <img className='pro-img' alt=''
                            src={photo.user.profileImage? photo.user.profileImage : defaultImg}
                            style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                            onError={imgError}
                            />
                        </div>
                    <div className='user-info'>
                        <p>{photo.user.username}</p>
                        <p>{()=>formatedDate(photo.createdAt)}</p>
                    </div>

                    {(photo.user.id === session.id) && photo && (
                        <div className='modal'>
                            <div className='delete-button' onClick={()=>{setSelectedPhoto(photo);setDeleteModal(true)}}>Delete</div>
                                {deleteModal &&
                                    <Modal onClose={()=>setDeleteModal(false)} >
                                        <DeletePhotoAlarm hideModal={()=> setDeleteModal(false)} photo={selectedPhoto} />
                                    </Modal>
                                }

                        </div>
                        )}
                    </div>
                </div>



        </div>))}
    </div>
      );


}
export default PhotoList;
