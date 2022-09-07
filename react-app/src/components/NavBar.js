
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { Modal } from '../context/Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const user = useSelector(state => state.session.user);

  // const loggedIn = ()=>{
  //   setShowModal(false)
  // }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} >
            Home
          </NavLink>
        </li>
        <li>
        <button className='login-button' onClick={() => setShowLogin(true)}>Log In</button>
            {showLogin && (!user) && (!showSignup) && (
              <Modal onClose={() => setShowLogin(false)}>
                <LoginForm />
              </Modal>
            )}

        </li>
        <li>
        <button className='signup-button' onClick={() => setShowSignup(true)}>Sign up</button>
            {showSignup && (!user) && (!showLogin) && (
              <Modal onClose={() => setShowSignup(false)}>
                <SignUpForm />
              </Modal>
            )}
        </li>
        <li>
          <NavLink to='/users' exact={true} >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/parks' exact={true} >
            Parks
          </NavLink>
        </li>
        <li>
          <NavLink to='/trails' exact={true} >
            Trails
          </NavLink>

        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
