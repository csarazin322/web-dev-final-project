import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const location = useLocation()
  const path = location.pathname

  const { currentUser } = useSelector((state) => state.users)


  return (
    <div className={styles.NavBar}>
      <div className='nav nav-tabs nav-fill'>
        <Link className={`nav-link ${path === '/' ? 'active text-success' : ''}`} to='/'>
          Home
        </Link>
        <Link className={`nav-link ${path.startsWith('/feed') ? 'active text-success ' : ''}`} to='/feed'>
          Feed
        </Link>
        <Link className={`nav-link ${path.startsWith('/search') || path.startsWith('/details') ? 'active text-success ' : ''}`} to='/search'>
          Search
        </Link>
        <Link className={`nav-link ${path.startsWith('/profile') ? 'active text-success ' : ''}`} to={currentUser ? '/profile' : 'profile/login'}>
          Profile
        </Link>
      </div>
    </div>
  );

}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
