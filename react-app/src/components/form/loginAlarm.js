import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../style/loginAlarm.css"




const LoginAlarm = ({ hideModal }) => {

    console.log('inmodal')

    const handleOk = async (e) => {
        e.preventDefault();
        hideModal()
    }

    return (

            <div className='delete-form-content'>
            <h2>Please Login to explore more!</h2>
              <button type="button" onClick={handleOk} >OK</button>
            </div>



    )

}


export default LoginAlarm;
