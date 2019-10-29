import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import { Spinner } from 'reactstrap';

import { api, options } from '../utils';
import FolderItem from './FolderItem';
import ModalFolder from './ModalFolder';

const Folders = () => {
  const [show, setShow] = useState(false);
  const [folder, setFolder] = useState({
    name: '',
    description: '',
  });

  // toggle modal
  const toggleShow = () => {
    setShow(!show);
  };

  const [folders, setFolders] = useState(null);

  // fetch folders when component mounts
  useEffect(() => {
    fetchFolders();
  }, []);

  //fetch folders after evvery change
  const fetchFolders = () => {
    axios
      .get(`${api}fileshare/folder`, options)
      .then(res => {
        setFolders(res.data);
      })
      .catch(function(error) {
        if (error.response) {
          alertify.error(
            'There was a problem fetching access links please refresh the page'
          );
        }
      });
  };

  // form values are controlled.
  const handleChange = event => {
    const { value, name } = event.target;

    setFolder({ ...folder, [name]: value });
  };

  // send api call to create folder
  const handleSubmit = () => {
    if (folder.name.trim().length > 0 && folder.description.trim().length > 0) {
      axios
        .post(`${api}fileshare/folder`, folder, options)
        .then(res => {
          alertify.success('Folder created.');
          fetchFolders();
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response);
            alertify.error('There was a problem creating the folder');
          }
        });
    } else {
      // required checks empty
      alertify.error(
        'Name and description fields can not be empty or whitespaces'
      );
    }

    toggleShow();
  };

  // return folders if not empty
  return folders ? (
    <div className='col-12'>
      <button className='btn btn-outline-dark' onClick={toggleShow}>
        <i className='fa fa-plus' aria-hidden='true'></i>
      </button>

      <div className='mt-5 d-flex align-content-center flex-wrap'>
        {!folders
          ? null
          : folders.map(folder => {
              return (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  fetchFolders={fetchFolders}
                />
              );
            })}
      </div>
      <ModalFolder
        show={show}
        toggleShow={toggleShow}
        handleChange={handleChange}
        folder={folder}
        actionText='Add'
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <Spinner className='text-center' size='lg' type='grow' color='warning' />
  );
};

export default Folders;
