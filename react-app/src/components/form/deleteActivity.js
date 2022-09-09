import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {deleteActivityThunk} from "../../store/activity"



const DeleteActivityAlarm = ({ activity,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()

    const history = useHistory();

    const [errors, setErrors] = useState([])



    const handleDelete = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteActivityThunk(trailId,activity.id))
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
        <div className="delete-form-box">
            <form className="delete-form" onSubmit={handleDelete}>
            <div className='delete-form-content'>
            <h2>Delete Activity</h2>
            <p>Are you sure you want to delete this activity? This action cannot be undone.</p>
            <div className='button-group'>
              <button type="submit" onClick={handleDelete}>Delete</button>
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


export default DeleteActivityAlarm;
