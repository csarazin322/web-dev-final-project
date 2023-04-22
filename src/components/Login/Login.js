import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className={styles.Login}>
    <div className='mt-4 d-flex justify-content-center'>
      <p>Login with your username and password.</p>
    </div>
    <div className='mb-2 d-flex justify-content-center'>
      <input type="text" className="w-25 form-control" placeholder="Username" aria-label="Username" />
    </div>
    <div className='mb-2 d-flex justify-content-center'>
      <input type="text" className="w-25 form-control" placeholder="Password" aria-label="Password" />
    </div>
    <div className='mb-4 d-flex justify-content-center'>
      <button className='btn btn-primary'>
        Login
      </button>
    </div>

    <div className=' d-flex justify-content-center'>
      <p className='me-1'>Don't have an account?</p>
      <Link to={'/profile/register'}>Register now!</Link>
    </div>
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
