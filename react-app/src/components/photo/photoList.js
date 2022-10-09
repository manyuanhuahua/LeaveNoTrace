import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getPhotosThunk } from '../../store/photo';

import { Modal } from '../../context/Modal'

import "../style/photo.css"
import LargePhoto from './largePhoto';




function PhotoList({trailId}) {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photo);

    const [photoIsLoaded, setPhotoIsLoaded] = useState(false);
    const photoList = Object.values(photos).reverse()
    const [showModal, setShowModal] = useState(false);

    const [selectedPhoto, setSelectedPhoto] = useState({})






    useEffect(() => {
        dispatch(getPhotosThunk(trailId)).then(() => setPhotoIsLoaded(true));
    }, [dispatch,trailId]);






    return (photoIsLoaded
        &&
        <div className='photoList-container'>
            {photoList.map(photo => (
                <div className="photo-container">
                    <div className='top-box' onClick={()=>{setShowModal(true);setSelectedPhoto(photo)}}>
                        <img src={photo.url} alt='' />
                    </div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)} className='photo-modal'>
                            <LargePhoto photo={selectedPhoto} setShowModal={setShowModal}/>
                        </Modal>
                        )}

            </div>))}
    </div>
      );


}
export default PhotoList;
