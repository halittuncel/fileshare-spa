import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const ModalFileUpload = ({
  show,
  toggleShow,
  handleChange,
  file,
  actionText,
  handleSubmit,
}) => {
  return (
    <Modal isOpen={show} toggle={toggleShow}>
      <ModalBody>
        <FormGroup>
          <Label for='exampleFile'>File</Label>
          <Input
            type='file'
            name='file'
            id='exampleFile'
            required
            onChange={handleChange}
          />
        </FormGroup>
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

export default ModalFileUpload;
