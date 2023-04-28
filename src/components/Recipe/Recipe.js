import styles from './Recipe.module.css';
import recipeImg from './recipe.png';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { updateUserThunk } from '../../sercives/user/user-thunks';
import defaultRecipe from '../../data/default-recipe';
import { Link } from 'react-router-dom';


const Recipe = ({ recipe = defaultRecipe }) => {

  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch()

  const likeRecipe = async () => {
    const updatedLikes = [...currentUser.likedRecipesIds, recipe._id]
    const updatedUser = { ...currentUser, likedRecipesIds: updatedLikes };
    await dispatch(updateUserThunk(updatedUser));
  }

  const unlikeRecipe = async () => {
    const updatedLikes = currentUser.likedRecipesIds.filter((recipeId) => recipeId !== recipe._id);
    const updatedUser = { ...currentUser, likedRecipesIds: updatedLikes };
    await dispatch(updateUserThunk(updatedUser));
  }


  return (
    <div className={styles.Recipe}>
      <div className='card'>
        <img className='card-img-top' src={recipe.image} alt={recipeImg} />
        <div className='card-body'>
          <Link to={`/feed/${recipe._id}`} style={{ textDecoration: 'none' }}>
            <h5 className='card-title'>
              {recipe.title}
            </h5>
          </Link>
          <p className='card-text'>
            {recipe.description}
          </p>
          {currentUser && !currentUser.isChef ?
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
