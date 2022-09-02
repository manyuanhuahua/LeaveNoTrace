import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {getReviewsThunk} from "../../store/review"

function ReviewList({trailId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    // const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const reviewsList = Object.values(reviews);

    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId]);


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
