import React from 'react';
import styles from './Feed.module.css';
import Recipe from '../Recipe/Recipe';
import { findAllRecipes } from '../../sercives/recipe/recipe-services';
import { useSelector } from 'react-redux';


const Feed = () => {
  const { currentUser } = useSelector((state) => state.users);

  const listOfRecipes = currentUser? findAllRecipes().filter((recipe) => currentUser.chefsFollowingIds.includes(recipe.ownerId)).slice(0,20)
  : findAllRecipes().slice(0, 20);
  
  return (
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
);}


Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
