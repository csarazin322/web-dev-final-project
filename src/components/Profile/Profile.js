import React, { useState, useEffect, useCallback } from 'react';
import styles from './Profile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import defaultUser from '../../data/default-user';
import { findUserById, findUserByUsername } from '../../sercives/user/user-services';
import { logoutThunk, profileThunk } from '../../sercives/user/user-thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { findRecipeById } from '../../sercives/recipe/recipe-services';
import Recipe from '../Recipe/Recipe';

const Profile = () => {
  const { username } = useParams()
  const { currentUser } = useSelector((state) => state.users)
  const [profile, setProfile] = useState(defaultUser)
  const [chefCreatedRecipes, setChefCreatedRecipes] = useState([])
  const [consumerSavedRecipes, setConsumerSavedRecipes] = useState([])
  const [consumerChefsFollowing, setConsumerChefsFollowing] = useState([])
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

  const getRecipesCreatedById = useCallback(async () => {
    console.log('getting created recipes')
    console.log(profile)
    if (profile) {
      console.log('these are the profiles created recipes')
      console.log(profile.createdRecipeIds)
      const recipesFromDB = await Promise.all(profile.createdRecipeIds.map(async (rid) => await findRecipeById(rid)))
      console.log('got here more')
      console.log(recipesFromDB)
      setChefCreatedRecipes(recipesFromDB.map((recipe) => {
        return (
          <div className='col-4 mb-3' key={recipe._id}>
            <Recipe recipe={recipe} />
          </div>
        )
      }
      ))
    }
  }, [profile])

  const getLikedRecipesById = useCallback(async () => {
    if (profile) {
      const recipesFromDB = await Promise.all(profile.likedRecipesIds.map(async (rid) => await findRecipeById(rid)))
      setConsumerSavedRecipes(recipesFromDB.map((recipe) => {
        return (
          <div className='col-4 mb-3' key={recipe._id}>
            <Recipe recipe={recipe} />
          </div>
        )
      }
      ))
    }
  }, [profile])

  const getChefsYouFollowById = useCallback(async () => {
    if (profile) {
      const chefsFromDB = await Promise.all(profile.chefsFollowingIds.map(async (cid) => await findUserById(cid)))
      setConsumerChefsFollowing(chefsFromDB.map((chef) => {
        return (
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-8'>
                <h6>{chef.username}</h6>
                <p className='mb-0'>{`${chef.createdRecipeIds.length} Recipes Created`}</p>
              </div>
              <div className='col-4'>
                <button className='btn btn-primary float-end w-100' style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Follow</button>
              </div>
            </div>
          </li>
        )
      }))
    }
  }, [profile])


  useEffect(() => {
    console.log('doing use effect for getting recipes created or consumer stuff')
    if (profile && currentUser && profile._id === currentUser._id) {
      console.log('got here')
      console.log(profile)
      if (profile.isChef) {
        getRecipesCreatedById()
      } else {
        getLikedRecipesById()
        getChefsYouFollowById()
      }
    }
  }, [currentUser, profile, getLikedRecipesById, getChefsYouFollowById, getRecipesCreatedById])

  useEffect(() => {
    console.log(username)
    username ? getUserByUsername() : getProfile()
  }, [username])

  return (
    <div className={styles.Profile}>

      <div className='row mt-4 mb-3'>
        <div className='col-6 align-items-center d-inline-flex'>
          <FontAwesomeIcon className='me-2' size='xl' icon={faUser}></FontAwesomeIcon>
          <h3 className='mb-0'>{profile.username}</h3>
        </div>
        <div className='col-6'>
          <div className='float-end'>
            {
              (profile && currentUser && profile._id === currentUser._id) ?
                <button className='btn btn-warning' onClick={logout}>Logout</button>
                : (profile.isChef) ? <button className='btn btn-primary'>Follow</button> : ''

            }
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        {
          profile && profile.isChef ?
            (
              <div className='col-12'>
                <ul className='list-group'>
                  <li className='list-group-item'>
                    <h4 className='mb-0'>Recipes Created</h4>
                  </li>
                  <li className='list-group-item'>
                    <div className='row mt-3'>
                      {chefCreatedRecipes}
                    </div>
                  </li>
                </ul>
              </div>
            )
            : (
              <div className='col-8'>
                <ul className='list-group'>
                  <li className='list-group-item'>
                    <h4 className='mb-0'>Liked Recipes</h4>
                  </li>
                  <li className='list-group-item'>
                    <div className='row mt-3'>
                      {consumerSavedRecipes}
                    </div>
                  </li>
                </ul>
              </div>
            )
        }
        {
          profile && profile.isChef ?
            (
              ''
            )
            : (
              <div className='col-4'>
                <ul className="list-group">
                  <li className="list-group-item">
                    <h4 className='float-end mb-0'>Chefs Followed</h4>
                  </li>
                  {consumerChefsFollowing}
                </ul>
              </div>
            )
        }
      </div>
    </div>
  );

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
