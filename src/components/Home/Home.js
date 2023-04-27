import React, { useState, useEffect } from 'react';
import Recipe from '../Recipe/Recipe';
import styles from './Home.module.css';
import defaultRecipe from '../../data/default-recipe';
import ChefList from '../ChefList/ChefList';
import { findRecipes } from '../../sercives/recipe/recipe-services';


const Home = () => {
  const [listOfRecipes, setListOfRecipes] = useState([])

  const getListOfRecipes = async () => {
    const lor = await findRecipes()
    setListOfRecipes(lor)
  }

  useEffect(() => {
    console.log('using effect')
    getListOfRecipes()
  }, [])

  return (
    <div className={styles.Home}>
      <div className='row justify-content-start'>
        <div className='col-8 mt-3'>
          {listOfRecipes.map((recipe) => {
            return (
              <div className='row mb-3'>
                <Recipe recipe={recipe}></Recipe>
              </div>
            )
          })}
        </div>
        <div className='col-4 mt-3'>
          {<ChefList></ChefList>}
        </div>
      </div>
    </div>
  );
}


Home.propTypes = {};

Home.defaultProps = {};

export default Home;
