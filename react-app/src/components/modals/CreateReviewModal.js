import React from 'react';
import { Modal } from '../../context/Modal'
import CreateReviewForm from '../form/createReviewForm';

function CreateReviewModal({ trail,setCreateModal }) {


    return (
        <>
            {
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
