
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { Modal } from '../context/Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import { useSelector } from 'react-redux';


const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const user = useSelector(state => state.session.user);

  // const loggedIn = ()=>{
  //   setShowModal(false)
  // }

  return (
        <section>

            <img src='' className='person' alt=''></img>
            <img src='' className='person' alt=''></img>
            

        </section>
  )
  }
export default Home;
