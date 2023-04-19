import React from 'react';
import styles from './NavBar.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation()
  const path = location.pathname
  const activeNav = 'nav-link active bg-primary'
  const nav = 'nav-link'

  return (
    <div className={styles.NavBar}>
      <ul className='nav nav-tabs nav-fill'>
        <li className={path === '/' ? activeNav : nav}>
          <Link className={styles.link} to='/'>Home</Link>
        </li>
        <li className={path.startsWith('/recipes') ? activeNav : nav}>
          <Link className={styles.link} to='/recipes'>Recipes</Link>
        </li>
        <li className={path.startsWith('/seach') ? activeNav : nav}>
          <Link className={styles.link} to='/search'>Search</Link>
        </li>
        <li className={path.startsWith('/profile') ? activeNav : nav}>
          <Link className={styles.link} to='/profile'>Profile</Link>
        </li>
      </ul>
    </div>
  );

}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
