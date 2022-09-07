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
        if (data && data.errors) setErrors(data.errors);
      }
      ).then(()=>history.push('/currentUser'));
    };


  const onLogin = async (e) => {
    e.preventDefault();
    return await dispatch(login(email, password)).catch(
      async (res) => {
        // console.log("in the catch")

        const data  = await res.json();

        // console.log("data.error", data.errors)

        if (data && data.errors) setErrors(data.errors);

      }).then(()=>history.push('/currentUser'));
    }

  const updateEmail = (e) => {
    setEmail(e.target.value);

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button type="submit" onClick={handleDemo}>Demo User</button>
      </div>
      <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
    </form>
  );
};

export default LoginForm;
