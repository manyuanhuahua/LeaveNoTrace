import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import videoHome from "../assets/homeVideo.mp4"
import "./style/homepage.css"

const Main = () =>{


    return (
        <div className='main-container'>
            <div className='loading'>
                
            </div>
            <div className='overlay'></div>

                <video src={videoHome} autoPlay loop muted playsInline className='bgvideo'/>
                <div className='content'>
                    <h1>NEVER STOP</h1>
                    <Link to={'/explore'} className='explore'>Exploring</Link>
                </div>
        </div>
    )
}

export default Main
