import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteReviewAlarm from '../form/deleteReview';


function DeleteReviewModal({review,deleteModal,setDeleteModal}){


    return(
        <>
            <button onClick={()=>setDeleteModal(true)}>Delete</button>
            {deleteModal &&
                <Modal onClose={()=>setDeleteModal(false)} >
                    <DeleteReviewAlarm hideModal={()=> setDeleteModal(false)} review={review} />
                </Modal>
            }
        </>
    )
}

export default DeleteReviewModal
