import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import { api, token } from '../utils';
import { Spinner } from 'reactstrap';

const Links = () => {
  const [links, setLinks] = useState(null);
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    axios
      .get(`${api}fileshare/access`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setLinks(res.data);
      })
      .catch(function(error) {
        if (error.response) {
          alertify.error(
            'There was a problem fetching access links please refresh the page'
          );
        }
      });
  };

  const deleteLink = id => {
    axios
      .delete(`${api}fileshare/access/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        alertify.success('Access Link deleted.');
        fetchLinks();
      })
      .catch(function(error) {
        if (error.response) {
          alertify.error('There was a problem deleting access link.');
        }
      });
  };

  return links ? (
    <div className='col-10 col-lg-8 mx-auto vh-100'>
      <table className='table table-responsive-sm table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Access Code</th>
            <th scope='col'>File Name</th>
            <th scope='col'>Folder Name</th>
            <th scope='col'>Used</th>
            <th scope='col'>Usage Date</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => {
            return (
              <tr key={link.id}>
                <th scope='row'>{index}</th>
                <td>{link.id}</td>
                <td>{link.fileName}</td>
                <td>{link.folderName}</td>
                <td>{link.isUsed.toString()}</td>
                <td>{link.usedAt ? link.usedAt : '--__--'}</td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteLink(link.id)}
                  className='bg-warning text-white text-center'>
                  X
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <Spinner type='grow' color='warning' />
  );
};

export default Links;
