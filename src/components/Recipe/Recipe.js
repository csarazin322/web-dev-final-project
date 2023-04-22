import React from 'react';
import styles from './Recipe.module.css';
import recipeImg from './recipe.png';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {updateUserThunk} from '../../sercives/user/user-thunks';
import defaultRecipe from '../../data/default-recipe';


const Recipe = (recipe = defaultRecipe) => {
  
  const { currentUser } = useSelector((state) => state.users);

  const likeRecipe= () => {
    const updateLikedRecipesIds = currentUser.likedRecipesIds.push(recipe._id);
    const updatedUser = {... currentUser, likedRecipesIds: updateLikedRecipesIds};
    const response = updateUserThunk(updatedUser);
  }
  
  
  return (
  <div className={styles.Recipe}>
    <div className='card'>
      <img className='card-img-top' src={recipeImg} alt={recipeImg} />
      <div className='card-body'>
        <h5 className='card-title'>
          ${recipe.title}
        </h5>
        <p className='card-text'>
          ${recipe.description}
        </p>
        ${currentUser ?
          <FontAwesome onClick={ likeRecipe } icon={faHeart} color={currentUser.likedRecipesIds.find((recipeId) => recipe._id === recipeId) ? 'red' : ''}/>
          :
          ""}

      </div>
    </div>
  </div>
);}

Recipe.propTypes = {};

Recipe.defaultProps = {};

export default Recipe;
