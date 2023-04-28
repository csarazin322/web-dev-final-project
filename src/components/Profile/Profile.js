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
  const { currentUser } = useSelector((state) => state.users)
  const { username } = useParams()
  const [profile, setProfile] = useState(defaultUser)
  const [changedUser, setChangedUser] = useState({ ...currentUser })
  const [chefCreatedRecipes, setChefCreatedRecipes] = useState([])
  const [consumerSavedRecipes, setConsumerSavedRecipes] = useState([])
  const [consumerChefsFollowing, setConsumerChefsFollowing] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveProfileChanges = async () => {
    await dispatch(updateUserThunk({ ...currentUser, firstName: changedUser.firstName, lastName: changedUser.lastName, email: changedUser.email, password: changedUser.password }))
    getProfile()
  }

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
      setChefCreatedRecipes(recipesFromDB.reverse().map((recipe) => {
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
      setConsumerSavedRecipes(recipesFromDB.reverse().map((recipe) => {
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

            <div className='row'>
              <div className='col-8'>
                <Link style={{ textDecoration: 'none' }} className='' to={`/profile/username/${chef.username}`}>
                  <h6 className='w-100' style={{ wordBreak: 'break-word' }}>{chef.username}</h6>
                  <p className='mb-0'>{`${chef.createdRecipeIds.length} Recipes Created`}</p>

                </Link>
              </div>
              <div className='col-4'>
                <div className='float-end'>
                  {!currentUser.isChef ? followUnfollowButton(chef._id) : ''}
                </div>
              </div>
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
  }, [profile, currentUser, getChefsYouFollowById, getLikedRecipesById, getRecipesCreatedById])

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
            <h3 className='mb-0 me-2' style={{ wordBreak: 'break-word' }}>{`${profile.username} | ${profile.firstName} ${profile.lastName}`}</h3>

          </div>
          <div className='col-6'>
            <div className='float-end'>
              {(currentUser && profile._id === currentUser._id) ?
                <button className='btn btn-warning' onClick={logout}>Logout</button>
                : (currentUser && !currentUser.isChef && profile.isChef) ? followUnfollowButton(profile._id) : ''}
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

      {
        currentUser && profile && currentUser._id === profile._id ?
          (
            <>
              <div className='row mb-2'>
                <h4 className='col-12'>
                  Edit Your Profile
                </h4>
              </div><div className='row mb-2'>
                <div className='col-6'>
                  <div className='form-floating'>
                    <input
                      value={changedUser.firstName} onChange={(e) => setChangedUser({ ...changedUser, firstName: e.target.value })}
                      id='first_name' type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
                    <label for='first_name'>First Name</label>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-floating'>
                    <input
                      value={changedUser.lastName} onChange={(e) => setChangedUser({ ...changedUser, lastName: e.target.value })}
                      id='last_name' type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
                    <label for='last_name'>Last Name</label>
                  </div>
                </div>
              </div>

              <div className='row mb-2'>
                <div className='col-6'>
                  <div className='form-floating'>
                    <input
                      value={changedUser.email} onChange={(e) => setChangedUser({ ...changedUser, email: e.target.value })}
                      id='email' type="text" className="form-control" placeholder="email" aria-label="email" />
                    <label for='email'>Email</label>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-floating'>
                    <input
                      value={changedUser.password} onChange={(e) => setChangedUser({ ...changedUser, password: e.target.value })}
                      id='password' type="text" className="form-control" placeholder="Password" aria-label="Password" />
                    <label for='password'>Password</label>
                  </div>
                </div>
              </div>

              <div className='row mb-2'>
                <div className='col-12'>
                  <button className='btn btn-warning float-end' onClick={saveProfileChanges}>Save Changes</button>
                </div>
              </div>
            </>
          ) :
          ''
      }
    </div>
  );

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
