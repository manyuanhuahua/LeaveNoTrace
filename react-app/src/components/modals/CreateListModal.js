import React from 'react';
import { Modal } from '../../context/Modal'
import CreateListForm from '../form/createList';


function CreateListModal({ createListModal,setCreateListModal }) {
    return (
        <>
        <div className='add-list-button' onClick={()=>setCreateListModal(true)}>Create New List</div>
            {createListModal &&
                (
                    <Modal onClose={() => setCreateListModal(false)}>
                        <CreateListForm hideModal={()=>setCreateListModal(false)} />
                    </Modal>
                )
            }
        </>
    )
}

export default CreateListModal;
