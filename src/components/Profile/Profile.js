import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = () => (
  <div className={styles.Profile}>
    Profile Component
    : their profile info
    : list of chefs they follow
    : saved recipes
    : --if theyre a chef, just their recepies
  </div>
);

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
