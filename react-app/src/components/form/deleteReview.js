import { useState } from "react";
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {deleteReviewThunk} from "../../store/review"



const DeleteReviewAlarm = ({ review,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [errors, setErrors] = useState([])



    const handleDelete = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteReviewThunk(review.trailId,review.id))
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
            <form className="delete-form" onSubmit={handleDelete}>
            <div className='delete-album-form'>
            <h2>Delete Review</h2>
            <p>Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className='button-group'>
              <button type="button" onClick={handleDelete}>Delete</button>
              <button type="button" onClick={handleCancel} >Cancel</button>
            </div>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx} >{error}</li>
                ))}
            </ul>
          </div>

       </form>
        </div>
    )


}


export default DeleteReviewAlarm;
