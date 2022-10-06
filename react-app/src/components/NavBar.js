import React, {useState} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import LogoutButton from './auth/LogoutButton';
import { Modal } from '../context/Modal';

import { useSelector } from 'react-redux';
import SwitchForm from './auth/switchForm';
import "./style/nav.css"
import logo from "../assets/logo.jpg"


const NavBar = () =>{
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const history = useHistory()


    const user = useSelector(state => state.session.user);

    const defaultImg = 'https://nerdbear.com/wp-content/uploads/2022/03/Mario.jpg'

    const imgError = (e) =>{
          e.target.src = defaultImg
    }

    const menuToggle=()=>{
      const toggleMenu = document.querySelector(".pro-drop-menu")
      toggleMenu.classList.toggle('active')
    }

    return (
        <div className='main-container'>
            <div className='nav-bar'>
                <nav>
                    <div onClick={() => history.push('/')} exact="true" style={{cursor:'pointer'}}>
                      <img src={logo} alt='' className='logo'  />

                    </div>
                    <ul style={{height:'100%'}}>
                    <li>
                      <Link className='button' to='/' exact="true" >
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
                                   
                                </Modal>
                                )}

                        </li>
                    </>
                    )}
                      {user && (
                        <>
                          <li>
                              <Link className='button' to='/parks' exact="true" >
                                  Parks
                              </Link>
                          </li>
                          <li>

                              <Link className='button' to='/trails' exact="true" >
                                  Trails
                              </Link>
                          </li>
                          <li className='pro-section'>
                            <div className='profile' onClick={()=>menuToggle()}>
                                <img src={user.profileImg? user.profileImg : defaultImg}
                                alt=''
                                onError={imgError}
                                />
                            </div>
                            <div className='pro-drop-menu'>
                              <h4>{user.username}</h4>
                              <ul>
                                <li><img src='https://cdn-icons-png.flaticon.com/512/48/48674.png' /><NavLink to={`/users/${user.id}`}>My Profile</NavLink></li>
                                <li><img src='https://www.nicepng.com/png/detail/368-3689520_email-icons-grey-email-icon-pink-png.png' /><p >{user.email}</p></li>
                                <li ><img src='https://png.pngtree.com/png-vector/20190425/ourmid/pngtree-vector-logout-icon-png-image_991952.jpg' /><LogoutButton /></li>

                              </ul>
                            </div>
                          </li>
                          <li>

                          </li>
                        </>)}
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default NavBar
