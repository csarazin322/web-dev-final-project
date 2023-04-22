import React from 'react';
import Recipe from '../Recipe/Recipe';
import styles from './Home.module.css';

const listOfRecipes = [];

const Home = () => (
  <div className={styles.Home}>
    <div className='row justify-content-start'>
      <div className='col-8'>
        {listOfRecipes.map((_) => {
          return (
            <div className='row'>
              <Recipe></Recipe>
            </div>
          )
        })}
      </div>
      <div className='col-4'>
        popular chefs ... have follow button appear when logged in
      </div>
    </div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
