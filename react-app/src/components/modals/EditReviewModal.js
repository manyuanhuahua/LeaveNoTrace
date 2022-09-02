import React from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from '../form/editReviewForm';


function EditReviewModal({review,setShowModal}){
    // const [showModal, setShowModal] = useState(false);

    return(
        <>
        { (
            <Modal onClose={()=>setShowModal(false)}>

                <EditReviewForm review={review} hideModal={()=> setShowModal(false)} />
            </Modal>
            )
        }
        </>
    )
}

export default EditReviewModal
