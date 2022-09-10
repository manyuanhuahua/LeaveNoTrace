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
                    <h1>Leave The Road</h1>
                    <h1 className='slogan2'>Take The Trails</h1>
                    <Link to={'/explore'} className='explore'>Exploring</Link>
                </div>
                <div className='footer'>
                    <img className='github'></img>
                    <img className='linkedin'></img>
                </div>
        </div>
    )
}

export default Main
