import React from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from '../form/editReviewForm';


function DeleteReviewModal({review,setShowModal}){


    return(
        <>
       
        { (
                <Modal onClose={()=>setShowModal(false)}>

                    <EditReviewForm hideModal={()=> setShowModal(false)} review={review} />
                </Modal>
            )
        }
        </>
    )
}

export default DeleteReviewModal
