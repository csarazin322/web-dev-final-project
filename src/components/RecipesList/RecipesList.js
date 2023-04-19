import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecipesList.module.css';

const RecipesList = () => (
  <div className={styles.RecipesList}>
    list of all available recipes ... changes based on anonymous, user, or cook
  </div>
);

RecipesList.propTypes = {};

RecipesList.defaultProps = {};

export default RecipesList;
