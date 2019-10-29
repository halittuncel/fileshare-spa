import React from 'react';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalFolder = ({
  show,
  toggleShow,
  handleChange,
  folder,
  actionText,
  handleSubmit,
}) => {
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
            value={folder.name}
            placeholder='Enter Name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='desc'>Description</label>
          <input
            type='text'
            className='form-control'
            id='desc'
            name='description'
            onChange={handleChange}
            required
            value={folder.description}
            placeholder='Enter Description'
          />
        </div>
      </ModalBody>
      <ModalFooter>
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

export default ModalFolder;
