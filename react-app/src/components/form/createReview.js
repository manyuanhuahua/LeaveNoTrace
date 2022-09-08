import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {creatReviewThunk} from "../../store/review"
import { Rating } from 'react-simple-star-rating'



const CreateReviewForm = ({ trail,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [content, setContent] = useState("")
    // const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0)

    const [errors, setErrors] = useState([])

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

        setRating(score)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newReview = {
            content,
            rating
        };
        dispatch(creatReviewThunk(trailId,newReview))
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
        <div className="create-form-box">
            <div className="create-form-header">
                <h3>{trail.name}</h3>
            </div>
            <div className="form-stars">
            </div>
            <div className="form-content">
                <form className="create-review-form" onSubmit={handleSubmit}>
                    <div className="create-form-content">
                        <div className="star-rating">
                            <Rating
                                onClick={handleRating}
                                rating={rating}
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
                        <button id='submit-review-button' type="submit" onClick={handleSubmit}>Add Review</button>
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
    )


}


export default CreateReviewForm;
