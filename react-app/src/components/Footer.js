import React, { useEffect, useState } from 'react';

import github from "../assets/git.png"
import linkedin from "../assets/linkdin.png"



function Footer() {
    return (
    <div className='footer-container'>

            <div className='github'>
                <a href='https://github.com/manyuanhuahua' >
                <img src={github} alt='' className='git' style={{borderRadius:'50%',width:'30px', height:'30px',marginRight:'10px' }}/>
                </a>
                <p>Github</p>
            </div>
            <div className='linkedin'>
            <a href='https://www.linkedin.com/in/tf-sde/' >
            <img src={linkedin} alt='' className='linkedIn' style={{width:'30px', height:'30px',marginRight:'10px'}}/>
            </a>
            <p>LinkedIn</p>
            </div>

            {/* <div className='portfolio'>

                <p>Portfolio</p>
            </div> */}

    </div>
    )
}

export default Footer
