import React, {useState} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import videoHome from "../assets/homeVideo.mp4"
import LogoutButton from './auth/LogoutButton';
import { Modal } from '../context/Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import { useSelector } from 'react-redux';
import SwitchForm from './auth/switchForm';
import "./style/nav.css"
import logo from "../assets/logo.jpg"


const NavBar = () =>{
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showParks, setShowParks] = useState(false);
    const [showTrails, setTrails] = useState(false);
    const history = useHistory()


    const user = useSelector(state => state.session.user);

    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }


    return (
        <div className='main-container'>
            <div className='nav-bar'>
                <nav>
                    <div onClick={() => history.push('/')} exact={true} style={{cursor:'pointer'}}>
                      <img src={logo} alt='' className='logo'  />
                      {/* <h3 className='logo'>LeaveNoTrace</h3> */}
                    </div>
                    <ul>
                    <li>
                      <Link className='button' to='/' exact={true} >
                        Home
                      </Link>

                    </li>
                    {(!user) && (
                      <>

                          <li className='forms-modal'>
                            <div className='button' onClick={() => setShowLogin(true)}>User</div>
                                {showLogin && (!user) && (!showSignup) && (
                                <Modal className='forms-modal' onClose={() => setShowLogin(false)}>
                                    <SwitchForm />
                                    {/* <LoginForm /> */}
                                </Modal>
                                )}

                        </li>
                        {/* <li>
                            <div className='button' onClick={() => setShowSignup(true)}>Signup</div>
                                {showSignup && (!user) && (!showLogin) && (
                                <Modal onClose={() => setShowSignup(false)}>
                                    <SignUpForm />
                                </Modal>
                                )}
                        </li> */}
                        {/* <li>
                          <Link to='/switch'>
                                  switch
                          </Link>
                          </li> */}

                      </>
                    )}
                      {user && (
                        <>
                          <li>
                              <Link className='button' to='/parks' exact={true} >
                                  Parks
                              </Link>
                          </li>
                          <li>

                              <Link className='button' to='/trails' exact={true} >
                                  Trails
                              </Link>
                          </li>
                          <li className='pro-img' style={{
                            width: '30px',
                            height: '30px',
                            // marginRight: '20px',
                            // borderRadius:'50%'
                          }}>
                            <img src={user.profileImg? user.profileImg : defaultImg}
                            alt=''
                            onError={imgError}
                            style={{
                              height:'100%',
                              width:'100%',
                              borderRadius:'50%',

                              objectFit: 'cover'

                            }}/>
                          </li>
                          <li>
                            <div className='button'>
                                <LogoutButton />
                            </div>
                          </li>
                        </>)}
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default NavBar
