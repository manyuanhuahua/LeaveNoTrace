import React from 'react';
import { Modal } from "../../context/Modal";
import EditReviewForm from '../form/editReview';
import "../style/review.css"

function EditReviewModal({review,editModal,setEditModal}){


    return(
        <>
        <div className='edit-button'onClick={()=>setEditModal(true)}>Edit</div>
            {editModal &&
                (
                <Modal onClose={()=>setEditModal(false)}>
                    <EditReviewForm review={review} hideModal={setEditModal} />
                </Modal>
            )
        }
        </>
    )
}

export default EditReviewModal
