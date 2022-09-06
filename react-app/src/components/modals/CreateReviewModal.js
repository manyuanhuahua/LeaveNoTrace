import React from 'react';
import { Modal } from '../../context/Modal'
import CreateReviewForm from '../form/createReview';

function CreateReviewModal({ trail,createModal,setCreateModal }) {


    return (
        <>
        <button onClick={()=>setCreateModal(true)}>Write review</button>
            {createModal &&
                (
                    <Modal onClose={() => setCreateModal(false)}>
                        <CreateReviewForm trail={trail} hideModal={setCreateModal} />
                    </Modal>
                )
            }
        </>
    )
}

export default CreateReviewModal;
