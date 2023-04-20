import React from 'react';
import styles from './Feed.module.css';
import Recipe from '../Recipe/Recipe';

const Feed = () => (
  <div className={styles.Feed}>
    <div className='row mt-3'>
      <div className='col-4 mb-2 mb-2'>
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
  </div>
);

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
