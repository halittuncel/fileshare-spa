import React, { useState } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import fileDownload from 'js-file-download';

import { api } from '../utils';

const AccessLink = () => {
  const [code, setCode] = useState('');

  // on submit gets the file from server
  const onSubmitGetFile = event => {
    event.preventDefault();
    if (code.trim().length > 0) {
      axios
        .put(`${api}fileshare/access/${code}`)
        .then(res => {
          alertify.success('Folder downloading.');
          var fileToDownload = res.data.file;
          fileDownload(fileToDownload, res.data.name);
        })
        .catch(function(error) {
          if (error.response) {
            alertify.error('There was a problem downloading the folder.');
          }
        });
    } else {
      // required checks empty
      alertify.error('Code field can not be empty or whitespaces');
    }
  };

  // code value controlled input
  const handleChange = event => {
    const { value } = event.target;

    setCode(value);
  };

  return (
    <div className='col-12 col-md-6 col-lg-4 offset-lg-4 offset-md-3 text-center'>
      <form className='form-signin' onSubmit={onSubmitGetFile}>
        <label htmlFor='inputCode' className='sr-only'>
          Access Code
        </label>

        <div className='mb-5'></div>

        <input
          type='text'
          id='inputCode'
          className='form-control'
          placeholder='Code'
          name='code'
          value={code}
          onChange={handleChange}
          required
          autoFocus
        />

        <div className='mb-2'></div>
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Get File
        </button>
      </form>
    </div>
  );
};

export default AccessLink;
