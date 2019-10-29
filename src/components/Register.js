import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import alertify from 'alertifyjs';

import { api } from '../utils';

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
  });

  const onSubmitRegisterForm = async event => {
    event.preventDefault();
    if (
      registerInfo.email.trim().length > 0 &&
      registerInfo.password.trim().length > 0
    ) {
      axios
        .post(`${api}auth/register`, registerInfo)
        .then(res => {
          console.log(res);
          console.log(res.data);

          if (res.status === 201) {
            alertify.success('Successfully signed up!');
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status === 400) {
              alertify.error(
                'Please check email and password fields! Password should be more than 4 characters.' +
                  ' \n If you already have an acoount please sign in!'
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
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  return (
    <div className='col-12 col-md-6 col-lg-4 offset-lg-4 offset-md-3 text-center'>
      <form className='form-signin' onSubmit={onSubmitRegisterForm}>
        <img
          className='mb-4'
          src='https://cdn4.iconfinder.com/data/icons/files-and-folders-20/16/12_folder-share-hand-data-archive-512.png'
          alt=''
          width='128'
          height='128'
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please sign up</h1>
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
          value={registerInfo.email}
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
          value={registerInfo.password}
          required
        />

        <div className='mb-2'></div>

        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign up
        </button>
        <NavLink to='/login' className='nav-link'>
          Sign In
        </NavLink>
        <p className='mt-5 mb-3 text-muted'>&copy; 2019</p>
      </form>
    </div>
  );
};

export default Register;
