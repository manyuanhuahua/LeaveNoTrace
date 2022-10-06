import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import "../style/nav.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout()).then(()=>history.push('/'));

  };

  return <div className='nav-logout-button' onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
