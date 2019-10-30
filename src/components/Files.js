import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { api, token, options } from '../utils';
import FileItem from './FileItem';
import ModalFileUpload from './ModalFileUpload';

const Files = props => {
  const folderId = props.location.state.folderId;
  const [file, setFile] = useState({});
  const [folder, setFolder] = useState(null);
  const [show, setShow] = useState(false);

  // toggle modal
  const toggleShow = () => {
    setShow(!show);
  };

  const fetchFolder = useCallback(() => {
    axios
      .get(`${api}fileshare/folder/${folderId}`, options)
      .then(res => {
        setFolder(res.data);
      })
      .catch(function(error) {
        if (error.response) {
          alertify.error('There was a problem fetching files.');
        }
      });
  }, [folderId]);

  // fetch folder when component mounts
  useEffect(() => {
    fetchFolder();
  }, [fetchFolder]);

  // get the file in modal assign it to a variable
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  // for some reason axios return error used fetch for sending file
  // there is no precaution to data loss or its integrity
  const handleFileUpload = () => {
    const formData = new FormData();

    formData.append('file', file);

    fetch(`${api}fileshare/folder/${folderId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        alertify.success('File created.');
        fetchFolder();
      })
      .catch(error => {
        alertify.error('There was a problem creating the file');
      });

    toggleShow();
  };

  return folder ? (
    <div className='col-12'>
      <button className='btn btn-outline-dark' onClick={toggleShow}>
        <i className='fa fa-plus' aria-hidden='true'></i>
      </button>

      <div className='mt-5  d-flex align-content-center flex-wrap'>
        {!folder
          ? null
          : folder.files.map(f => {
              return (
                <FileItem
                  key={f.id}
                  folderId={folderId}
                  file={f}
                  fetchFolder={fetchFolder}
                />
              );
            })}
        {folder && folder.files.length ? null : (
          <h1 className='text-center'>Empty</h1>
        )}
      </div>
      <ModalFileUpload
        show={show}
        toggleShow={toggleShow}
        handleChange={handleChange}
        file={file}
        handleSubmit={handleFileUpload}
        folderId={folderId}
        actionText='Add'
      />
    </div>
  ) : (
    <Spinner type='grow' color='warning' />
  );
};

export default withRouter(Files);
