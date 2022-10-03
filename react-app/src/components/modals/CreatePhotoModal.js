import React from 'react';
import { Modal } from '../../context/Modal'
import CreatePhotoForm from '../form/createPhoto';

function CreatePhotoModal({ trail,createModal,setCreateModal }) {


    return (
        <>
        <div onClick={()=>setCreateModal(true)}>Upload Photos</div>
            {createModal &&
                (
                    <Modal onClose={() => setCreateModal(false)}>
                        <CreatePhotoForm trail={trail} hideModal={setCreateModal} />
                    </Modal>
                )
            }
        </>
    )
}

export default CreatePhotoModal;
