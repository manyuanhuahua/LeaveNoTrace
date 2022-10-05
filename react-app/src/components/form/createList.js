import React, { useEffect, useState } from 'react'
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {creatListThunk} from "../../store/list"

import "./listForm.css"



const CreateListForm = ({ hideModal }) => {
    const dispatch = useDispatch();
    const {userId} = useParams()
    const history = useHistory();

    const [name, setName] = useState("")

    const [errors, setErrors] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const trimedName =name.trim()
        const newList = {
            name:trimedName
        };
        dispatch(creatListThunk(userId,newList))
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
        <div className="create-list-form-container">
            <div className='create-list-form-container-box'>
                <div className='box-left'></div>
                <div className='box-right'>
                    <div className="form-content">
                        <h3>Create a list</h3>
                        <form className="create-list-form" onSubmit={handleSubmit}>
                            <div className="create-form-content">
                            <input type='text'
                                value={name}
                                placeholder='Please enter list name'
                                onChange={e => setName(e.target.value)}
                                style={{overflowWrap:'break-word'}}
                                maxLength={31}
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


export default CreateListForm;
