import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../style/photo.css"
import { Modal } from '../../context/Modal'

import DeletePhotoAlarm from '../form/deletePhoto';



const LargePhoto = ({ photo,setShowModal }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const session = useSelector(state => state.session.user);
    const [time,setTime] = useState('')

    const formatedDate = (time) =>{
        const createDate = new Date(time)
        const date = (`0${createDate.getDate()}`).slice(-2)
        const month = (`0${createDate.getMonth()+1}`).slice(-2)
        const year = createDate.getFullYear()
        setTime(`${month}/${date}/${year}`)
    }

    useEffect(()=>{
        formatedDate(photo.createdAt)
    },[])



    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

        return time && (<div className='display-photo'>
                    <div className='large-img' >
                        <img src={photo.url} alt='' className='large'/>
                    </div>
                    <div className='photo-user-pro'>
                        <div className='user-pro-img'>
                        <img className='pro-img' alt=''
                            src={photo.user.profileImage? photo.user.profileImage : defaultImg}
                            style={{
                                backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'}}
                            onError={imgError}
                        />
                        </div>
                        <div className='user-info'>
                            <h3>{photo.user.username}</h3>
                            <p style={{fontSize:'12px'}}>{time}</p>
                        </div>
                        <div className='photo-title'>
                            <p>{photo.trail.name}</p>
                        </div>
                        {(photo.user.id === session.id) && photo && (
                            <div className='modal'>
                                      <i className="fa-solid fa-trash-can" onClick={() => setDeleteModal(true)} style={{color:'#85794f'}}><span style={{margin:'0 8px', fontSize:'12px'}}>Delete</span></i>
                                    {deleteModal &&
                                        <Modal onClose={()=>setDeleteModal(false)} >
                                            <DeletePhotoAlarm hideModal={()=>setDeleteModal(false)} setShowModal={setShowModal} photo={photo} />
                                        </Modal>
                                    }

                                </div>
                        )}
                    </div>
                </div>)
        }

export default LargePhoto
