import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import videoHome from "../assets/homeVideo.mp4"
import "./style/homepage.css"
import Footer from './Footer';
import LoginAlarm from './form/loginAlarm';
import { Modal } from '../context/Modal';
import { useSelector } from 'react-redux';


const Main = () =>{
    const [showModal, setShowModal] = useState(false)
    const user = useSelector(state => state.session.user);
    // const handleShow=()=>{
    //     setShowModal(true)
    // }

    // console.log('indiv',showModal);
    return (
        <div className='main-container'>

            <div className='overlay'></div>

                <video src={videoHome} autoPlay loop muted playsInline className='bgvideo'/>
                <div className='content'>
                    <h1>Leave The Road</h1>
                    <h1 className='slogan2'>Take The Trails</h1>
                    <>

                    {(!user) && (<div onClick={() => setShowModal(true)} className='explore' style={{cursor:'pointer'}}>Exploring</div>)}
                        {showModal &&
                            (
                                <Modal onClose={() => setShowModal(false)}>
                                    <LoginAlarm hideModal={()=>setShowModal(false)} />
                                </Modal>
                            )

                    }
                    {(user) && (!showModal) && (<Link to={'/explore'} className='explore'>Exploring</Link>)}
                    </>
                </div>

                <div className='footer'>
                    <Footer />
                </div>
        </div>

    )
}

export default Main
