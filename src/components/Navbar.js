import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  // logout function removes token from local storage.
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <NavLink to='/' className='nav-link ' href='#'>
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/folders' className='nav-link ' href='#'>
          Folders
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/links' className='nav-link ' href='#'>
          Links
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/accessfile' className='nav-link ' href='#'>
          Access File
        </NavLink>
      </li>
      <li className='nav-item' onClick={logout}>
        {isLoggedIn ? (
          <a href='#!' className='nav-link '>
            Logout
          </a>
        ) : (
          <NavLink to='/login' className='nav-link' href='#'>
            {isLoggedIn ? 'Logout' : 'Login'}
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
