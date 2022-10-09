import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {getReviewsThunk} from "../../store/review"
import {FaStar} from 'react-icons/fa'

import { Modal } from "../../context/Modal";
import EditReviewForm from '../form/editReview';

import DeleteReviewAlarm from '../form/deleteReview';

import "../style/review.css"

function ReviewList({trailId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState({})


    const reviewsList = Object.values(reviews).reverse();

    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId,editModal]);


    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

  return (reviewsIsLoaded &&
    <div className='reviewList-container'>
        {reviewsList.map(review => (
            <div className="review-container">
                <div className='top-box'>
                    <div className='review-owner'>
                        <div className='user-pro'>

                            <img className='pro-img' alt=''
                            src={review.user.profileImage? review.user.profileImage : defaultImg}
                            style={{backgroundImage:'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'}}
                            onError={imgError}
                            />
                        </div>
                    <div className='user-info'>
                        <p>{review.user.username}</p>
                        <p>{review.createdAt}</p>
                    </div>


                    {(review.user.id === session.id) && review && (
                        <div className='modal'>

                            <div className='edit-button'onClick={()=>{
                                setSelectedReview(review);
                                setEditModal(true)}}>UPDATE</div>

                                {editModal &&
                                    (
                                    <Modal onClose={()=>setEditModal(false)}>
                                        <EditReviewForm selectedReview={selectedReview} hideModal={()=>setEditModal(false)} />
                                    </Modal>
                                )
                            }
                            <div className='delete-button' onClick={()=>{setSelectedReview(review);setDeleteModal(true)}}>Delete</div>
                                {deleteModal &&
                                    <Modal onClose={()=>setDeleteModal(false)} >
                                        <DeleteReviewAlarm hideModal={()=> setDeleteModal(false)} review={selectedReview} />
                                    </Modal>
                                }

                        </div>
                        )}
                    </div>
                </div>
                <div className='review-rate-content'>
                    <div className='rating-box' style={{marginTop:'8px'}}>
                    {[...Array(5)].map((star,i)=>{
                        const ratingValue = i + 1
                        return (
                        <FaStar className='star'
                            size={25}
                            color={ratingValue <= review.rating ? '#688E4E' : '#e4e5e9'}

                            />)
                    })}

                    </div>

            
                    <div className='review-content'>{review.content}</div>
                </div>

            </div>)
            )
        }
    </div>
  );
}

export default ReviewList;
