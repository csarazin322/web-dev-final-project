import React, { useState, useEffect } from 'react';
import styles from './Feed.module.css';
import Recipe from '../Recipe/Recipe';
import { findRecipes } from '../../sercives/recipe/recipe-services';
import { useSelector, useDispatch } from 'react-redux';



const Feed = () => {
  const { currentUser } = useSelector((state) => state.users);

  const [listOfRecipes, setListOfRecipes] = useState([])

  const getListOfRecipes = async () => {
    const lor = await findRecipes()
    currentUser ?
      setListOfRecipes(
        lor.filter((recipe) => {
          console.log(recipe)
          console.log(currentUser)
          return currentUser.chefsFollowingIds.includes(recipe.ownerId)
        })
      )
      :
      setListOfRecipes(lor)
  }

  useEffect(() => {
    console.log('using effect')
    getListOfRecipes()
  }, [])

  return (
    <div className={styles.Feed}>
      <div className='row mt-3'>
        {listOfRecipes.map((recipe) => {
          return (
            <div className='col-4 mb-4'>
              <Recipe recipe={recipe}></Recipe>
            </div>
          )
        })}
      </div>
    </div >
  );
}


Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
