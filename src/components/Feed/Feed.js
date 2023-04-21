import React from 'react';
import styles from './Feed.module.css';
import Recipe from '../Recipe/Recipe';

const listOfRecipes = ['weep', 'woo', 'thing', 'it']

const Feed = () => (
  <div className={styles.Feed}>
    <div className='row mt-3'>
      {listOfRecipes.map((_) => {
        return (
          <div className='col-4 mb-4'>
            <Recipe></Recipe>
          </div>
        )
      })}
    </div>
  </div >
);

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
