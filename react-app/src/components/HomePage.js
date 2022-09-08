
// import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
// import { Modal } from '../context/Modal';
// import LoginForm from './auth/LoginForm';
// import SignUpForm from './auth/SignUpForm';
// import { useSelector } from 'react-redux';
// import background from '../img/background.png'
// import hiker from '../img/hiker.png'
// import "./style/home.css"



// const Home = () => {
//   const [offset, setOffset] = useState();

//   const handleScroll = () => setOffset(window.scrollY)




//   window.addEventListener('scroll', handleScroll)
// //     let value = window.scrollY;
//     // console.log("offset-----", offset)





//   return (
//     <>
//         <section className='section1'>
//             <nav>
//                 <div className='nav-container'>
//                     <h3 className='logo'>Leave<span>No</span><span>Trace</span></h3>
//                     <div className='menu'>
//                         <div className='bar'></div>
//                     </div>
//                 </div>
//             </nav>
//             <h1 id='big-title' style={{bottom:  offset/1 +'%'}}>NEVER STOP EXPLORE</h1>
//             <img src={background} id='mountain' alt='' style={{top: 0 + offset * 0.75 +'px'}}></img>
//             <img src={hiker} id='person' alt=''style={{top: 0 +offset * 0.5 +'px'}}></img>


//         </section>
//         <section className='section2'>
//             <div className='shadow'></div>
//             <div className='container'>

//                 <div className='img-container'>
//                     <img src={background}></img>
//                 </div>

//             </div>
//         </section>
//         </>
//   )
//   }
// export default Home;
