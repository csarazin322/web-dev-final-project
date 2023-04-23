import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Login from '../Login/Login'
import { useDispatch, useSelector } from 'react-redux';
import defaultUser from '../../data/default-user';
import { findUserByUsername } from '../../sercives/user/user-services';
import { logoutThunk, profileThunk } from '../../sercives/user/user-thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { findRecipeById } from '../../sercives/recipe/recipe-services';
import Recipe from '../Recipe/Recipe';

const Profile = () => {
  const { username } = useParams()
  const { currentUser } = useSelector((state) => state.users)
  const [profile, setProfile] = useState(defaultUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const getProfile = async () => {
    const action = await dispatch(profileThunk())
    action.payload ? setProfile(action.payload) : navigate('/profile/login')
  }

  const getUserByUsername = async () => {
    const user = await findUserByUsername(username)
    setProfile(user)
  }

  const logout = async () => {
    await dispatch(logoutThunk())
    navigate('/profile/login')
  }

  // const getLikedRecipesById = () => {
  //   console.log('these are my recipes')
  //   console.log(currentUser.likedRecipesIds)
  //   const likedRecipesObj = currentUser.likedRecipesIds.map(async (recipeId) => {
  //     return await findRecipeById(recipeId)
  //   })
  //   console.log(likedRecipesObj)
  //   const recipesHtml = likedRecipesObj.map((recepie) => (
  //     <div className='col-7'>
  //       <h6>
  //         Your Recipe Book
  //       </h6>
  //       {() => {
  //         const recipes = getLikedRecipesById()
  //         return recipes.map((recipe) => (
  //           <Recipe recipe={recipe} />
  //         ))
  //       }}
  //     </div>))
  //   return recipesHtml
  // }
  const [likedRecipes, setLikedRecipes] = useState([])
  const [likedRecipesHtml, setLikedRecipesHtml] = useState([])
  const [consumerResults, setConsumerResults] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLikedRecipesById = async () => {
    const recipesFromDB = await Promise.all(profile.likedRecipesIds.map(async (rid) => await findRecipeById(rid)))
    setLikedRecipes(recipesFromDB)
    setConsumerResults(likedRecipes.map((recipe) => {
      return (
        <div className='col-6 mb-3'>
          <Recipe recipe={recipe} />
        </div>
      )
    }
    ))
  }


  useEffect(() => {
    if (profile && currentUser && profile._id === currentUser._id) {
      getLikedRecipesById()
      return
    }
  }, [profile, currentUser])

  useEffect(() => {
    console.log(username)
    username ? getUserByUsername() : getProfile()
  }, [])

  return (
    <div className={styles.Profile}>

      <div className='row mt-4 mb-3'>
        <div className='col-6 align-items-center d-inline-flex'>
          <FontAwesomeIcon className='me-2' size='xl' icon={faUser}></FontAwesomeIcon>
          <h3 className='mb-0'>{profile.username}</h3>
        </div>
        <div className='col-6'>
          <button className='btn btn-warning float-end' onClick={logout}>Logout</button>
        </div>
      </div>
      <div className='row mb-4'>
        {currentUser && currentUser.isChef ? '' :
          (
            <div className='col-7'>
              <h4>Your Recipe Book</h4>
              <div className='row mb-3'>
                {consumerResults}
              </div>
            </div>
          )
        }
      </div>

      {/* <div className='row'>
        <div className='mb-3 d-flex justify-content-center'>
          <button className='btn btn-warning w-50' onClick={logout}>Logout</button>
        </div>
      </div> */}
    </div>
  );

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
