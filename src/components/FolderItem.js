import React, { useState } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';

import { api, options } from '../utils';
import ModalFolder from './ModalFolder';

const FolderItem = ({ folder, fetchFolders }) => {
  const [show, setShow] = useState(false);

  const [folderEditing, setFolderEditing] = useState({
    name: folder.folderName,
    description: folder.folderDescription,
  });

  const toggleShow = () => {
    setShow(!show);
  };

  // deletes folder
  const handleDelete = () => {
    alertify.confirm(
      'Are you sure?',
      function() {
        axios
          .delete(`${api}fileshare/folder/${folder.id}`, options)
          .then(res => {
            alertify.success('Folder deleted successfully');

            fetchFolders();
          })
          .catch(function(error) {
            if (error.response) {
              alertify.error(
                'There was a problem fetching access links please refresh the page'
              );
            }
          });
      },
      function() {
        alertify.error('Cancel');
      }
    );
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setFolderEditing({ ...folderEditing, [name]: value });
  };

  const handleEdit = () => {
    if (
      folderEditing.name.trim().length > 0 &&
      folderEditing.description.trim().length > 0
    ) {
      axios
        .put(`${api}fileshare/folder/${folder.id}`, folderEditing, options)
        .then(res => {
          alertify.success('Folder edited.');
          setFolderEditing({ name: '', description: '' });
          fetchFolders();
        })
        .catch(function(error) {
          if (error.response) {
            alertify.error('There was a problem editing the folder.');
          }
        });
    } else {
      // required checks empty
      alertify.error(
        'Name and description fields can not be empty or whitespaces'
      );
    }
  };

  return (
    <Card className='col-12 col-sm-4 col-md-4 col-lg-3' outline color='dark'>
      <CardHeader>
        <ModalFolder
          show={show}
          toggleShow={toggleShow}
          handleChange={handleChange}
          folder={folderEditing}
          handleSubmit={handleEdit}
          actionText='Edit'
        />
        <div className='col-12 d-flex justify-content-between'>
          <i
            onClick={toggleShow}
            role='button'
            style={{ cursor: 'pointer' }}
            className='fa fa-pencil-square-o fa-2x'
            aria-hidden='true'></i>
          <i
            onClick={handleDelete}
            role='button'
            style={{ cursor: 'pointer' }}
            className='fa fa-trash fa-2x'
            aria-hidden='true'></i>
        </div>
      </CardHeader>
      <CardBody>
        <Link to={{ pathname: '/files', state: { folderId: folder.id } }}>
          <img
            src='https://cdn2.iconfinder.com/data/icons/squareplex/512/yellow_folder.png'
            className='card-img-top'
            alt='folder'
          />
        </Link>
        <div className='card-body text-center'>
          <h5 className='card-title'>{folder.folderName}</h5>
          <p className='card-text'>{folder.folderDescription}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default withRouter(FolderItem);
