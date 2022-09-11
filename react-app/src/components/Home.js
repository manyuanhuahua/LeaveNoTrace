import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import videoHome from "../assets/homeVideo.mp4"
import "./style/homepage.css"
import Footer from './Footer';



const Main = () =>{


    return (
        <div className='main-container'>

            <div className='overlay'></div>

                <video src={videoHome} autoPlay loop muted playsInline className='bgvideo'/>
                <div className='content'>
                    <h1>Leave The Road</h1>
                    <h1 className='slogan2'>Take The Trails</h1>
                    <Link to={'/explore'} className='explore'>Exploring</Link>
                </div>
                <div className='footer'>
                    <Footer />
                </div>
        </div>
    )
}

export default Main
