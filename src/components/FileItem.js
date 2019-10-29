import React, { useState } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import fileDownload from 'js-file-download';
import { Spinner, Card, CardHeader, CardBody } from 'reactstrap';

import { api, options } from '../utils';
import ModalFile from './ModalFile';

const FileItem = ({ folderId, file, fetchFolder }) => {
  const [show, setShow] = useState(false);

  const [fileEditing, setFileEditing] = useState({
    name: file.fileName,
  });

  const toggleShow = () => {
    setShow(!show);
  };

  // delete on delete button clicked
  const handleDelete = () => {
    alertify.confirm(
      'Are you sure?',
      function() {
        axios
          .delete(`${api}fileshare/folder/${folderId}/file/${file.id}`, options)
          .then(res => {
            alertify.success('Folder deleted successfully');

            fetchFolder();
          })
          .catch(function(error) {
            if (error.response) {
              alertify.error('There was a problem deleting the file.');
            }
          });
      },
      function() {
        alertify.error('Cancel');
      }
    );
  };

  // modal form values controlled input
  const handleChange = event => {
    const { value, name } = event.target;

    setFileEditing({ ...fileEditing, [name]: value });
  };

  // on edit save changes send put req.
  const handleEdit = () => {
    if (fileEditing.name.trim().length > 0) {
      axios
        .put(
          `${api}fileshare/folder/${folderId}/file/${file.id}`,
          fileEditing,
          options
        )
        .then(res => {
          alertify.success('Folder edited.');
          setFileEditing({ name: '' });
          fetchFolder();
        })
        .catch(function(error) {
          if (error.response) {
            alertify.error('There was a problem editing the folder.');
          }
        });
      toggleShow();
    } else {
      // required checks empty
      alertify.error('Name field can not be empty or whitespaces');
    }
  };

  // On item click downloads the file
  const downloadFile = () => {
    axios
      .get(
        `${api}fileshare/folder/${folderId}/file/${file.id}`,

        options
      )
      .then(res => {
        alertify.success('Folder downloading.');

        var fileToDownload = res.data;
        fileDownload(fileToDownload, `${file.fileName}.${file.fileExtension}`);
      })
      .catch(function(error) {
        if (error.response) {
          alertify.error('There was a problem downloading the folder.');
        }
      });
  };

  return file ? (
    <Card className='col-12 col-sm-4  col-md-4 col-lg-3' outline color='dark'>
      <CardHeader>
        <ModalFile
          show={show}
          toggleShow={toggleShow}
          handleChange={handleChange}
          file={fileEditing}
          fileId={file.id}
          folderId={folderId}
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
            onClick={() => handleDelete(file.id)}
            role='button'
            style={{ cursor: 'pointer' }}
            className='fa fa-trash fa-2x '
            aria-hidden='true'></i>
        </div>
      </CardHeader>
      <CardBody>
        <img
          style={{ cursor: 'pointer' }}
          onClick={downloadFile}
          src='http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png'
          className='card-img-top'
          alt='file'
        />
        <div className='card-body text-center'>
          <h5 className='card-title'>{file.fileName}</h5>
        </div>
      </CardBody>
    </Card>
  ) : (
    <Spinner type='grow' color='warning' />
  );
};

export default FileItem;
