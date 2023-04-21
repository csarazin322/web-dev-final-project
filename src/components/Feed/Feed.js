import React from 'react';
import styles from './Feed.module.css';
import Recipe from '../Recipe/Recipe';

const listOfRecipes = ['weep', 'woo']

const Feed = () => (
  <div className={styles.Feed}>
    <div className='col=3 mt-3'>
      {listOfRecipes.forEach((recepie) => {
        return (
          <div className='col-4 mb-2'>
            <Recipe ></Recipe>
          </div>
        )
      })}
    </div>

    <div className='row mt-3'>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
      <div className='col-4 mb-2'>
        <Recipe></Recipe>
      </div>
    </div>
  </div >
);

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
