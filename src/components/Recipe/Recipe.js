import React from 'react';
import PropTypes from 'prop-types';
import styles from './Recipe.module.css';
import recipeImg from './recipe.png';

const Recipe = () => (
  <div className={styles.Recipe}>
    <div className='card'>
      <img className='card-img-top' src={recipeImg} alt={recipeImg} />
      <div className='card-body'>
        <h5 className='card-title'>
          Title of Recipe
        </h5>
        <p className='card-text'>
          short, max 140 char description of the recipe
        </p>
      </div>
    </div>
  </div>
);

Recipe.propTypes = {};

Recipe.defaultProps = {};

export default Recipe;
