import React, { useState, useEffect, useCallback } from 'react';
import styles from './Profile.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import defaultUser from '../../data/default-user';
import { findUserById, findUserByUsername } from '../../sercives/user/user-services';
import { logoutThunk, profileThunk, updateUserThunk } from '../../sercives/user/user-thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
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

  const getProfile = useCallback(async () => {
    console.log('getting profile')
    const action = await dispatch(profileThunk())
    action.payload ? setProfile(action.payload) : navigate('/profile/login')
  }, [dispatch, setProfile])

  const getUserByUsername = async () => {
    const user = await findUserByUsername(username)
    setProfile(user)
  }

  const logout = async () => {
    await dispatch(logoutThunk())
    navigate('/profile/login')
  }

  const unfollow = async (chefId) => {
    await dispatch(updateUserThunk({ ...currentUser, chefsFollowingIds: currentUser.chefsFollowingIds.filter((cid) => cid !== chefId) }))

  }

  const follow = async (chefId) => {
    await dispatch(updateUserThunk({ ...currentUser, chefsFollowingIds: [...currentUser.chefsFollowingIds, chefId] }))
  }

  const followUnfollowButton = (chefId) => {

    return (currentUser ? (
      currentUser.chefsFollowingIds.find((cid) => cid === chefId) ? (
        <button className='btn btn-danger' onClick={() => unfollow(chefId)}>Unfollow</button >
      )
        : (
          <button className='btn btn-primary' onClick={() => follow(chefId)}>Follow</button >
        )
    ) : '')
  }

  const getRecipesCreatedById = useCallback(async () => {
    const profiletoget = (profile._id === currentUser._id) ? currentUser : profile
    if (profiletoget) {
      const recipesFromDB = await Promise.all(profiletoget.createdRecipeIds.map(async (rid) => await findRecipeById(rid)))
      setChefCreatedRecipes(recipesFromDB.map((recipe) => {
        return (
          <div className='col-4 mb-3' key={recipe._id}>
            <Recipe recipe={recipe} />
          </div>
        )
      }
      ))
    }
  }, [profile, currentUser])

  const getLikedRecipesById = useCallback(async () => {
    const profiletoget = (profile._id === currentUser._id) ? currentUser : profile
    if (profiletoget) {
      const recipesFromDB = await Promise.all(profiletoget.likedRecipesIds.map(async (rid) => await findRecipeById(rid)))
      setConsumerSavedRecipes(recipesFromDB.map((recipe) => {
        return (
          <div className='col-4 mb-3' key={recipe._id}>
            <Recipe recipe={recipe} />
          </div>
        )
      }
      ))
    }
  }, [profile, currentUser])

  const getChefsYouFollowById = useCallback(async () => {
    const profiletoget = (profile._id === currentUser._id) ? currentUser : profile
    if (profiletoget) {
      const chefsFromDB = await Promise.all(profiletoget.chefsFollowingIds.map(async (cid) => await findUserById(cid)))
      setConsumerChefsFollowing(chefsFromDB.map((chef) => {
        return (
          <li className='list-group-item'>
            <div className='d-flex justify-content-between'>
              <Link style={{ textDecoration: 'none' }} className='' to={`/profile/username/${chef.username}`}>
                <div>
                  <h6>{chef.username}</h6>
                  <p className='mb-0'>{`${chef.createdRecipeIds.length} Recipes Created`}</p>
                </div>
              </Link>
              {followUnfollowButton(chef._id)}
            </div>
          </li>
        )
      }))
    }
  }, [profile, currentUser])


  useEffect(() => {
    console.log('running use effect 1')
    if (profile) {
      if (profile.isChef) {
        getRecipesCreatedById()
      } else {
        getLikedRecipesById()
        getChefsYouFollowById()
      }
    }
  }, [profile, currentUser, getChefsYouFollowById, getLikedRecipesById, getChefsYouFollowById])

  useEffect(() => {
    console.log('running use effect 2')
    username ? getUserByUsername() : getProfile()
  }, [username])

  return (
    <div className={styles.Profile}>
      {profile ?
        (<><div className='row mt-4 mb-3'>
          <div className='col-6 align-items-center d-inline-flex'>
            <FontAwesomeIcon className='me-2' size='xl' icon={profile.isChef ? faKitchenSet : faUser}></FontAwesomeIcon>
            <h3 className='mb-0'>{profile.username}</h3>
          </div>
          <div className='col-6'>
            <div className='float-end'>
              {(currentUser && profile._id === currentUser._id) ?
                <button className='btn btn-warning' onClick={logout}>Logout</button>
                : (currentUser && profile.isChef) ? followUnfollowButton(profile._id) : ''}
            </div>
          </div>
        </div><div className='row mb-4'>
            {profile.isChef ?
              (
                <div className='col-12 mb-3'>
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
                <><div className='col-sm-12 col-md-12 col-lg-12 col-xl-8 mb-3'>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      <h4 className='mb-0'>
                        Liked Recipes
                      </h4>
                    </li>
                    <li id='likedRecipes' className='list-group-item'>
                      <div className='row mt-3'>
                        {consumerSavedRecipes}
                      </div>
                    </li>
                  </ul>
                </div><div className='col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3'>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <h4 className='float-end mb-0'>Chefs Followed</h4>
                      </li>
                      {consumerChefsFollowing}
                    </ul>
                  </div></>
              )}

          </div></>
        )
        : (
          <div className='row mt-4 mb-3'>
            <div className='col-6 align-items-center d-inline-flex'>
              <FontAwesomeIcon className='me-2' size='xl' icon={faUser}></FontAwesomeIcon>
              <h3 className='mb-0'>User Not Found</h3>
            </div>
          </div>
        )}
    </div>
  );

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
