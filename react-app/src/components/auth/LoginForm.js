import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const demo = {
    email: "demo@aa.io",
    password:"password"
  }

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login(demo.email,demo.password)).catch(
      async (res) => {
        const data  = await res.json();
        if (data && data.errors){
          setErrors(data.errors);

        }else{
          history.push('/home')
        }
      }
      )
      // .then(()=>history.push('/home'));
    };


  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
        console.log("in the catch")

    return await dispatch(login(email, password)).then(
      async (res) => {
        // const data  = await res.json();
        // console.log("in form data", data)
        if (res && res.errors){
          setErrors(res.errors)
        }else{
          history.push('/home')
        }
        // {

          // console.log("in form data.error", res.errors)
          // console.log('error----',errors)
        // }else{
        //   history.push('/home')
        // } ;

      })
      // .then(()=>history.push('/home'));
    }

  const updateEmail = (e) => {
    setEmail(e.target.value);

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onLogin} className='form'>
      <>
        <h1>Log In</h1>
        <label htmlFor='email'>
          {/* <span>Email</span> */}
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required={true}
        />
        </label>


        <label htmlFor='password'>
          {/* <span>Password</span> */}
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required={true}
        />
        </label>
        <div className='login-buttons'>
        <button className='submit' type='submit'>Login</button>
        <button className='demo' type="submit" onClick={handleDemo}>Demo User</button>
        </div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
    </>
    </form>
  );
};

export default LoginForm;
