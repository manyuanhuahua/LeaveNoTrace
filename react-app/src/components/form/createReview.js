import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {creatReviewThunk} from "../../store/review"
import "./reviewForm.css"
import StarRating from '../../helper/Rating';


const CreateReviewForm = ({ trail,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [content, setContent] = useState("")

    const [rating, setRating] = useState(null)

    const [errors, setErrors] = useState([])



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

                                </div>
                                <textarea
                                    className='content-field'
                                    placeholder="Share your thoughts about the trail so others know what to expect"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />

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


        </div>
    )


}


export default CreateReviewForm;
