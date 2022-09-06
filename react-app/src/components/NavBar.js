
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} >
            Sign Up
          </NavLink>
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
