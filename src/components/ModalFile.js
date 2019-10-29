import React from 'react';
import alertify from 'alertifyjs';

import { api, token } from '../utils';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalFile = ({
  show,
  toggleShow,
  handleChange,
  file,
  fileId,
  folderId,
  actionText,
  handleSubmit,
}) => {
  // again axios giving error used fetch
  // create one time access link for a file
  const handleCreateAccess = () => {
    console.log(`${api}fileshare/folder/${folderId}/file/${fileId}`);

    fetch(`${api}fileshare/folder/${folderId}/file/${fileId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        alertify.success('Access Link created.');
      })
      .catch(error => {
        alertify.error('There was a problem creating the link.');
      });
    toggleShow();
  };
  return (
    <Modal isOpen={show} toggle={toggleShow}>
      <ModalBody>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            required
            autoFocus
            onChange={handleChange}
            value={file.name}
            placeholder='Enter Name'
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={handleCreateAccess}>
          Create access link
        </Button>
        <Button color='danger' onClick={handleSubmit}>
          {actionText}
        </Button>
        <Button color='secondary' onClick={toggleShow}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalFile;
