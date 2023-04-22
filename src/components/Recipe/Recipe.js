import React, { useState } from 'react';
import styles from './Recipe.module.css';
import recipeImg from './recipe.png';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { updateUserThunk } from '../../sercives/user/user-thunks';
import defaultRecipe from '../../data/default-recipe';
import defaultUser from '../../data/default-user';


const Recipe = ({ recipe = defaultRecipe }) => {
  console.log(`this is the recipe id ${recipe._id}`)
  console.log(recipe)

  const { currentUser } = useSelector((state) => state.users);
  const [user, setUser] = useState(defaultUser)
  const dispatch = useDispatch()

  const likeRecipe = async () => {
    console.log(currentUser)
    console.log(recipe._id)
    const newLikedRecipes = [...currentUser.likedRecipesIds, recipe._id]

    const updatedUser = { ...currentUser, likedRecipesIds: newLikedRecipes };
    console.log(updatedUser)
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
            <FontAwesomeIcon onClick={likeRecipe} icon={faHeart} color={currentUser.likedRecipesIds.find((recipeId) => recipe._id === recipeId) ? 'red' : ''} />
            :
            ''}

        </div>
      </div>
    </div>
  );
}

Recipe.propTypes = {};

Recipe.defaultProps = {};

export default Recipe;
