import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EditReviewModal from '../modals/EditReviewModal';
import DeleteReviewModal from '../modals/DeleteReviewModal';
import {getReviewsThunk} from "../../store/review"

function ReviewList({trailId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const reviewsList = Object.values(reviews);

    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId]);


    console.log("modal-------",editModal)



  return (reviewsIsLoaded &&
    <div className='parkList-container'>
        {reviewsList.map(review => (
            <div className="review-container" key={review.id}>
                <div className='review-owner'>
                    <div className='user-pro'>
                        <img className='pro-img' alt='' src={review.user.profileImage}/>
                    </div>
                    <div className='user-info'>
                        <p>{review.user.username}</p>
                        <p>{review.createdAt}</p>
                    </div>
                    {(review.user.id === session.id) && review && (
                        <div className='buttons'>
                            <button className='edit-button' onClick={() => setEditModal(true)} >
                                Edit
                                {editModal && <EditReviewModal review={review} setShowModal={setEditModal} />}
                            </button>
                            <button className='delete-button' onClick={() => setDeleteModal(true)} >
                                Delete
                                {deleteModal && <DeleteReviewModal review={review} setShowModal={setDeleteModal} />}
                            </button>
                        </div>
                        )}
                </div>
                <div className='review-rate'>{review.rating}</div>
                <div className='review-content'>{review.content}</div>

            </div>)
            )
        }
    </div>
  );
}

export default ReviewList;
