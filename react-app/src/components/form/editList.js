import React, { useState } from 'react';
import { useDispatch} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {updateListThunk} from "../../store/list";

import "../style/list.css"



const EditListForm = ({ selectedList,hideModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams()

    const [name, setName] = useState(selectedList.name)

    const [errors, setErrors] = useState([])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const trimedName =name.trim()

        const updateList = {
            ...selectedList,
            name:trimedName
        };

        dispatch(updateListThunk(userId,updateList))
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
        <div className="edit-list-form-container">
        <div className='edit-list-form-container-box'>
        <div className='box-left'></div>
        <div className='box-right'>
            <div className="form-content">
                <h3>Update {selectedList.name}</h3>

                <form className="edit-list-form" onSubmit={handleSubmit}>
                    <div className="edit-form-content">
                        <input type='text'
                                value={name}
                                placeholder='Please enter list name'
                                onChange={e => setName(e.target.value)}
                                style={{overflowWrap:'break-word'}}
                                maxLength={31}
                                />

                    </div>
                    <div className="edit-form-buttons">
                        <button id='submit-review-button' type="submit" onClick={handleSubmit}>Update</button>
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


export default EditListForm;
