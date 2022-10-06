import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {createPhotoThunk} from "../../store/photo"
import "../style/photo.css"


const CreatePhotoForm = ({ trail,hideModal }) => {
    const dispatch = useDispatch();
    const {trailId} = useParams()
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [displayImg,setDisplaylyImg] = useState(false)

    const [errors, setErrors] = useState([])



    const updateImage = (e) =>{
        const file = e.target.files[0];
        setImage(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setImageLoading(true);
        const newPhoto = {
            url:url
        }


        dispatch(createPhotoThunk(trailId,newPhoto))
            .then(
                async (res) => {
                    if (res.errors) {
                        setDisplaylyImg(false)
                        setImageLoading(false)
                        setErrors(res.errors)
                    }
                    else {
                        setImageLoading(false)
                        setDisplaylyImg(false)
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

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image',image);

        const res = await fetch(`/api/trails/photos/upload`, {
          method: "POST",
          body: formData,
      });

      const data = await res.json()
     
        setUrl(data.url)
        setDisplaylyImg(true)
      };

    return (
        <div className="create-photo-form-container">
                    <div className="photo-form-content">
                            <div className="create-form-content">
                                <h3>{trail.name}</h3>
                                <form onSubmit={handleUpload}>
                                <div className="photo-content">
                                    <input type='file' accept='image/*' onChange={updateImage} />
                                    <button className='photo-upload-button' onClick={handleUpload} type='button'>Preview</button>
                                    <p>(After choose your photo, please click <span style={{fontWeight:'700', fontSize:'12px'}}>'Preview'</span> to ensure the file is successfully selected !)</p>
                                </div>
                                </form>
                            </div>
                        <form className="create-photo-form" onSubmit={handleSubmit}>
                            <div className="create-form-buttons">

                                <button id='upload-photo-button' type="submit" onClick={handleSubmit}>Upload</button>
                                <button id='cancel-photo-button' type="button" onClick={handleCancel} >Cancel</button>

                            </div>
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx} >{error}</li>
                                ))}
                            </ul>
                        </form>
                        </div>
                        <div className='display-upload'>
                        {displayImg && (
                                        <img src={url} alt='' />
                                        )}
                        </div>
                    </div>
    )


}


export default CreatePhotoForm;
