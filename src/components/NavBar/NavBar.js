import React from 'react';
import styles from './NavBar.module.css';
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const location = useLocation()
  const path = location.pathname
  const activeNav = 'nav-link active bg-primary'
  const nav = 'nav-link'

  return (
    <div className={styles.NavBar}>
      <ul className='nav nav-tabs nav-fill'>
        <li className={path === '/' ? activeNav : nav}>
          Home
        </li>
        <li className={path.startsWith('/recipes') ? activeNav : nav}>
          Recipes
        </li>
        <li className={path.startsWith('/seach') ? activeNav : nav}>
          Search
        </li>
        <li className={path.startsWith('/profile') ? activeNav : nav}>
          Profile
        </li>
      </ul>
    </div>
  );

}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
