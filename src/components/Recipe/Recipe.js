import React from 'react';
import styles from './Recipe.module.css';
import recipeImg from './recipe.png';
import { useSelector } from 'react-redux';
import { FontAwesome, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {updateUserThunk} from '../../sercives/user/user-thunks';
import defaultRecipe from '../../data/default-recipe';
import { Dispatch } from 'react';


const Recipe = (recipe = defaultRecipe) => {
  
  const { currentUser } = useSelector((state) => state.users);

  const likeRecipe = async () => {
    const updateLikedRecipesIds = currentUser.likedRecipesIds;
    updateLikedRecipesIds.push(recipe._id);
    const updatedUser = {... currentUser, likedRecipesIds: updateLikedRecipesIds};
    const response = await dispatch(updateUserThunk(updatedUser));
  }

  const unlikeRecipe = async () => {
    const updateLikedRecipesIds = currentUser.likedRecipesIds;
    updateLikedRecipesIds.filter(recipe._id);
    const updatedUser = {... currentUser, likedRecipesIds: updateLikedRecipesIds};
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
          <FontAwesomeIcon onClick={ unlikeRecipe } icon={faHeart} color={'red'}/> :
          <FontAwesomeIcon onClick={ likeRecipe } icon={faHeart}/>)
          : ''}

      </div>
    </div>
  </div>
);}

Recipe.propTypes = {};

Recipe.defaultProps = {};

export default Recipe;
