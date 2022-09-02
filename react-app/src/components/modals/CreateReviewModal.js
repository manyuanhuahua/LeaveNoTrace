import React from 'react';
import { Modal } from '../../context/Modal'
import CreateReviewForm from '../form/createReviewForm';

function CreateReviewModal({ trail,setShowModal }) {


    return (
        <>
            {
                (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateReviewForm trail={trail} hideModal={() => setShowModal(false)} />
                    </Modal>
                )
            }
        </>
    )
}

export default CreateReviewModal;
