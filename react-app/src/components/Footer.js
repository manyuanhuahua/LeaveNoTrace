import React from 'react';

import github from "../assets/git.png"
import linkedin from "../assets/linkdin.png"



function Footer() {
    return (
    <div className='footer-container'>
            <p style={{letterSpacing:'1px',fontSize:'1.2rem'}}>#1-Hiker : </p>
            <div className='github'>
                <a href='https://github.com/manyuanhuahua' >
                <img src={github} alt='' className='git' style={{borderRadius:'50%',width:'30px', height:'30px',marginRight:'10px' }}/>
                <p>Github</p>
                </a>
            </div>
            <div className='linkedin'>
            <a href='https://www.linkedin.com/in/tf-sde/' >
            <img src={linkedin} alt='' className='linkedIn' style={{width:'30px', height:'30px',marginRight:'10px'}}/>
            <p>LinkedIn</p>
            </a>
            </div>


    </div>
    )
}

export default Footer
