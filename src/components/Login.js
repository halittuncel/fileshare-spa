import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import alertify from 'alertifyjs';

import { api } from '../utils';

const Login = ({ setIsLoggedIn }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  // submit login info if successful redirect to folders page
  // get token and set it to local storage
  const onSubmitLoginForm = async event => {
    event.preventDefault();
    if (
      loginInfo.email.trim().length > 0 &&
      loginInfo.password.trim().length > 0
    ) {
      axios
        .post(`${api}auth/login`, loginInfo)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          setIsLoggedIn(true);
          alertify.success('Successfully logged in!');
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status === 401) {
              alertify.error(
                'You have entered wrong email or password information!'
              );
            } else {
              alertify.error('Please check email and password fields!');
            }
          }
        });
    } else {
      // required checks empty
      alertify.error(
        'Email and password fields can not be empty or whitespaces'
      );
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <div className='col-12 col-md-6 col-lg-4 offset-lg-4 offset-md-3 text-center'>
      <form className='form-signin' onSubmit={onSubmitLoginForm}>
        <img
          className='mb-4'
          src='https://cdn4.iconfinder.com/data/icons/files-and-folders-20/16/12_folder-share-hand-data-archive-512.png'
          alt=''
          width='128'
          height='128'
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Email address
        </label>

        <div className='mb-5'></div>

        <input
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email address'
          name='email'
          value={loginInfo.email}
          onChange={handleChange}
          required
          autoFocus
        />

        <div className='mb-2'></div>

        <label htmlFor='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          name='password'
          onChange={handleChange}
          value={loginInfo.password}
          required
        />

        <div className='mb-2'></div>

        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign in
        </button>
        <NavLink to='/register' className='nav-link'>
          Sign Up
        </NavLink>
        <p className='mt-5 mb-3 text-muted'>&copy; 2019</p>
      </form>
    </div>
  );
};

export default Login;
