import { useState } from "react";
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {deleteListThunk} from "../../store/list"
import "./listForm.css"


const DeleteListAlarm = ({ list,hideModal }) => {
    const dispatch = useDispatch();
    const {userId} = useParams()
    const history = useHistory();

    const [errors, setErrors] = useState([])



    const handleDelete = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteListThunk(userId,list.id))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        hideModal()

                        history.push(`/users/${userId}`);
                    }

                })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setErrors([]);
        hideModal()
      };

    return (
        <div className="delete-list-form-box">
            <form className="delete-list-form" onSubmit={handleDelete}>
            <div className='delete-list-form-content'>
            <h2>Delete List</h2>
            <p>Are you sure you want to delete this list? This action cannot be undone.</p>
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


export default DeleteListAlarm;
