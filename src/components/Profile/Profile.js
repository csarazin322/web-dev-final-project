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
      </div>
      shiiit man im logged info

      <div className='row'>
        <div className='mb-3 d-flex justify-content-center'>
          <button className='btn btn-warning w-50' onClick={logout}>Logout</button>
        </div>
      </div>


      {/* Profile Component
     : their profile info
     : list of chefs they follow
     : saved recipes
     : --if theyre a chef, just their recepies */}
    </div>
  );

}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
