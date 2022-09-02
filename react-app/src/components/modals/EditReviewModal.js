import React from 'react';
import { Modal } from "../../context/Modal";
import EditReviewForm from '../form/editReviewForm';


function EditReviewModal({review,setEditModal}){
    // const [showModal, setShowModal] = useState(false);
    // setEditModal('test')

    return(
        <>
        { (

            <Modal onClose={()=>setEditModal(false)}>
                {/* {setEditModal(false)} */}
                <EditReviewForm review={review} hideModal={()=> setEditModal(false)} />
            </Modal>
            )
        }
        </>
    )
}

export default EditReviewModal
