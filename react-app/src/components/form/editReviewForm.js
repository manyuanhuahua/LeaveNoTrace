import React, { useState } from 'react';
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import {updateReviewThunk} from "../../store/review";
import { Rating } from 'react-simple-star-rating'



const EditReviewForm = ({ review,hideModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let trailId = review.trailId

    const [content, setContent] = useState(review.content)
    // const [hover, setHover] = useState(0);

    const [errors, setErrors] = useState([])
    const [rating, setRating] = useState(review.rating)

    let res;
    const ratingConvert = (rating) =>{
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

    // console.log("rating-------",ratingConvert(review.rating))

    const handleRating = (rate) => {
        let score;
        if (rate === 100){
            score = 5
        }else if(rate === 80){
            score = 4
        }else if(rate === 60){
            score = 3
        }else if(rate === 40){
            score = 2
        }else{
            score = 1
        }
        console.log("rate------",score)
        setRating(score)
    }


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

    // const handleCancel = (e) => {
    //     e.preventDefault();
    //     setErrors([]);

    //     hideModal()
    //   };

    return (
        <div className="create-form-box">
            <div className="create-form-header">
                <h3>{review.trailName}</h3>
            </div>
            <div className="form-stars">
            </div>
            <div className="form-content">
                <form className="create-review-form" onSubmit={handleSubmit}>
                    <div className="create-form-content">
                        <div className="star-rating">
                            <Rating
                                onClick={handleRating}
                                ratingValue={ratingConvert(review.rating)}
                                onChange={e => setRating(e.target.value)}
                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            />
                        </div>
                        <input
                            type={'textarea'}
                            placeholder="Share your thoughts about the trail so others know what to expect"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <div className="create-form-buttons">
                        <button id='submit-review-button' type="submit" onClick={handleSubmit}>Update Review</button>
                        <button id='cancel-review-button' type="button" onClick={()=> hideModal()} >Cancel</button>

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
    )


}


export default EditReviewForm;
