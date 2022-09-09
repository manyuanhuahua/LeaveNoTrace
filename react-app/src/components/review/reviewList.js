import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import EditReviewModal from '../modals/EditReviewModal';
import DeleteReviewModal from '../modals/DeleteReviewModal';
import {getReviewsThunk} from "../../store/review"
import { Rating } from 'react-simple-star-rating'
import "../style/review.css"

function ReviewList({trailId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const reviewsList = Object.values(reviews).reverse();

    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId,editModal]);




    const handleRating = (rating) => {
            let res
            if (rating === 5){
                res = 100
            }else if(rating === 4){
                res = 80
            }else if(rating === 3){
                res = 60
            }else if(rating === 2){
                res = 40
            }else{
                res = 20
            }
            return res
        }

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
                            <EditReviewModal review={review} editModal={editModal} setEditModal={setEditModal} />
                            <DeleteReviewModal review={review} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                        </div>
                        )}
                    </div>
                </div>
                <div className='review-rate-content'>
                    <div className='rating-box'>
                    <Rating
                        readonly={true}
                        ratingValue={handleRating(review.rating)}
                        fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                        // style={{ maxWidth:180 }}
                        />
                    </div>
                    {/* {`Rating:${review.rating}`} */}
                    <div className='review-content'>{review.content}</div>
                </div>

            </div>)
            )
        }
    </div>
  );
}

export default ReviewList;
