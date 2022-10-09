import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(signUp(username, email, password,profile));
    if (password === repeatPassword) {
      if (data) {
        setErrors(data)
      }
    }else{

      setErrors(['Repeat password does not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfile = (e) => {
    setProfile(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }




  return (
    <div className=''>
    <form onSubmit={onSignUp} action='#' className='form'>
        <h1>Sign Up</h1>

        <label>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username.trim()}
        ></input>
        </label>

        <label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
        </label>

        <label>
        <input
          type='text'
          name='profileImage'
          placeholder='Profile Image'
          onChange={updateProfile}
          value={profile.trim()}
        ></input>
        </label>

        <label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password.trim()}
        ></input>
        </label>

        <label>
        <input
          type='password'
          name='repeat_password'
          placeholder='Repeat Password'
          onChange={updateRepeatPassword}
          value={repeatPassword.trim()}
          required={true}
        ></input>
        </label>
      <button className='signup-submit' type='submit'>Sign Up</button>
      <ul>
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
    </form>
    </div>
  );
};

export default SignUpForm;
