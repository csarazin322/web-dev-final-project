import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import Login from '../Login/Login'

const Profile = () => (
  <div className={styles.Profile}>
    <Login />

    {/* Profile Component
    : their profile info
    : list of chefs they follow
    : saved recipes
    : --if theyre a chef, just their recepies */}
  </div>
);

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
