import React, { useEffect, useState } from 'react'
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {creatReviewThunk} from "../../store/review"
import { Rating } from 'react-simple-star-rating'
import "./reviewForm.css"
import StarRating from '../../helper/Rating';


const CreateReviewForm = ({ trail,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [content, setContent] = useState("")
    // const [hover, setHover] = useState(0);
    // const [rating, setRating] = useState(0)
    const [rating, setRating] = useState(null)

    const [errors, setErrors] = useState([])
    const [contentErrors, setContentErrors] = useState([])
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const trimedContent =content.trim()
        const newReview = {
            content:trimedContent,
            rating:rating
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
                        // history.push(`/trails/');
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
                        <h3>{trail.name}</h3>
                        <form className="create-review-form" onSubmit={handleSubmit}>
                            <div className="create-form-content">
                                <div className="star-rating">
                                    <StarRating rating={rating} setRating={setRating}/>
                                    {/* <Rating
                                        onClick={handleRating}
                                        rating={rating}
                                        fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                    /> */}
                                </div>
                                <textarea
                                    className='content-field'
                                    placeholder="Share your thoughts about the trail so others know what to expect"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                                {/* {contentErrors && <ul>
                                {contentErrors.map((error, idx) => (
                                    <li key={idx} >{error}</li>
                                ))}
                                </ul>
                                } */}
                            </div>
                            <div className="create-form-buttons">
                                <button id='submit-review-button' type="submit" onClick={handleSubmit}>Create</button>
                                <button id='cancel-review-button' type="button" onClick={handleCancel} >Cancel</button>

                            </div>
                        </form>
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx} >{error}</li>
                                ))}
                            </ul>
                    </div>
                </div>

            </div>

            <div>
                {/* <button onClick={history.goBack}>Cancel</button> */}
            </div>
        </div>
    )


}


export default CreateReviewForm;
