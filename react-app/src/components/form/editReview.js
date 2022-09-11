import React, { useState } from 'react';
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import {updateReviewThunk} from "../../store/review";
import { Rating } from 'react-simple-star-rating'
import StarRating from '../../helper/Rating';
import "./reviewForm.css"



const EditReviewForm = ({ review,hideModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let trailId = review.trailId

    const [content, setContent] = useState(review.content)

    const [errors, setErrors] = useState([])
    const [rating, setRating] = useState(review.rating)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const updateReview = {
            ...review,
            content,
            rating
        };
        dispatch(updateReviewThunk(trailId,updateReview))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        hideModal()
                        history.push(`/trails/${trailId}`);
                    }

                })
    }


    const handleCancel = (e) => {
        e.preventDefault();
        setErrors([]);

        hideModal()
      };

    return (
        <div className="create-form-container">
        <div className='create-form-container-box'>
        <div className='box-left'></div>
        <div className='box-right'>
            <div className="form-content">
                <h3>{review.trailName}</h3>
            </div>
                <form className="create-review-form" onSubmit={handleSubmit}>
                    <div className="create-form-content">
                        <div className="star-rating">
                            <StarRating rating={rating} setRating={setRating}/>
                        </div>
                        <textarea
                            className='content-field'
                            placeholder="Share your thoughts about the trail so others know what to expect"
                            value={content.trim()}
                            onChange={e => setContent(e.target.value)}
                        />

                    </div>
                    <div className="create-form-buttons">
                        <button id='submit-review-button' type="submit" onClick={handleSubmit}>Update</button>
                        <button id='cancel-review-button' type="button" onClick={handleCancel} >Cancel</button>

                    </div>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx} >{error}</li>
                        ))}
                    </ul>
                </form>
            </div>
            <div>
                {/* <button onClick={history.goBack}>Cancel</button> */}
            </div>
        </div>
    </div>



    )


}


export default EditReviewForm;
