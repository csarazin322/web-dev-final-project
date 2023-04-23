import React, { useState } from 'react';
import styles from './Recipe.module.css';
import recipeImg from './recipe.png';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { updateUserThunk } from '../../sercives/user/user-thunks';
import defaultRecipe from '../../data/default-recipe';
import { useDispatch } from 'react-redux';
import defaultUser from '../../data/default-user';


const Recipe = ({ recipe = defaultRecipe }) => {
  console.log(`this is the recipe id ${recipe._id}`)
  console.log(recipe)

  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch()


  const likeRecipe = async () => {
    const updatedLikes = [...currentUser.likedRecipesIds, recipe._id]
    const updatedUser = { ...currentUser, likedRecipesIds: updatedLikes };
    const response = await dispatch(updateUserThunk(updatedUser));
  }

  const unlikeRecipe = async () => {
    const updatedLikes = currentUser.likedRecipesIds.filter((recipeId) => recipeId !== recipe._id);
    const updatedUser = { ...currentUser, likedRecipesIds: updatedLikes };
    const response = await dispatch(updateUserThunk(updatedUser));
  }


  return (
    <div className={styles.Recipe}>
      <div className='card'>
        <img className='card-img-top' src={recipeImg} alt={recipeImg} />
        <div className='card-body'>
          <h5 className='card-title'>
            {recipe.title}
          </h5>
          <p className='card-text'>
            {recipe.description}
          </p>
          {currentUser ?
            (currentUser.likedRecipesIds.find((recipeId) => recipe._id === recipeId) ?
              <FontAwesomeIcon onClick={unlikeRecipe} icon={faHeart} color={'red'} /> :
              <FontAwesomeIcon onClick={likeRecipe} icon={faHeart} />)
            : ''}

        </div>
      </div>
    </div>
  );
}

Recipe.propTypes = {};

Recipe.defaultProps = {};

export default Recipe;
