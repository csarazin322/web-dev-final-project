import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from '../../data/default-user';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../sercives/user/user-thunks';

const Login = () => {
  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = async () => {
    await dispatch(loginThunk(user))
    navigate('/profile')
  }


  return (
    <div className={styles.Login}>
      <div className='mt-4 d-flex justify-content-center'>
        <p>Login with your username and password.</p>
      </div>
      <div className='mb-2 d-flex justify-content-center'>
        <div className='form-floating w-25'>
          <input onChange={(e) => setUser({ ...user, username: e.target.value })} id='username_field' type="text" className=" form-control" placeholder="Username" aria-label="Username" />
          <label for='username_field'>Username</label>
        </div>
      </div>
      <div className='mb-2 d-flex justify-content-center'>
        <div className='form-floating w-25'>
          <input onChange={(e) => setUser({ ...user, password: e.target.value })} id='password_field' type="text" className=" form-control" placeholder="Password" aria-label="Password" />
          <label for='password_field'>Password</label>
        </div>
      </div>
      <div className='mb-4 d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={login}>
          Login
        </button>
      </div>

      <div className=' d-flex justify-content-center'>
        <p className='me-1'>Don't have an account?</p>
        <Link to={'/profile/register'}>Register now!</Link>
      </div>
    </div>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
