import React from 'react';
import { Modal } from "../../context/Modal";
import EditReviewForm from '../form/editReview';


function EditReviewModal({review,editModal,setEditModal}){


    return(
        <>
        <button onClick={()=>setEditModal(true)}>Edit</button>
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
