import { useState } from "react";
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deletePhotoThunk } from "../../store/photo";
import "./reviewForm.css"


const DeletePhotoAlarm = ({ photo,hideModal,setShowModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [errors, setErrors] = useState([])



    const handleDelete = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deletePhotoThunk(trailId,photo.id))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        hideModal()
                        setShowModal(false)
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
            <h2>Delete Photo</h2>
            <p>Are you sure you want to delete this photo? This action cannot be undone.</p>
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


export default DeletePhotoAlarm;
