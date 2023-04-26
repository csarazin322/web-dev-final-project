import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import defaultUser from '../../data/default-user';
import { register } from '../../sercives/user/user-services';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../sercives/user/user-thunks';

const Register = () => {
  const [newUser, setNewUser] = useState(defaultUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registerNewUser = async () => {
    await register(newUser);
    const login = await dispatch(loginThunk(newUser))
    login.payload ? navigate('/profile') : console.log('incomplete profile or users with the same email or username exist')
  }

  // const handleOnChange1 = (e) => {
  //   console.log("at 1")
  //   console.log(e)
  //   setNewUser({ ...newUser, isChef: !e.target.checked })
  // }

  // const handleOnChange2 = (e) => {
  //   console.log("at 2")
  //   console.log(e)
  //   setNewUser({ ...newUser, isChef: e.target.checked })
  // }

  return (
    < div className={styles.Register} >
      <h4 className='mt-4 mb-3'>Register New User</h4>

      {/* first and last name row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              id='first_name' type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
            <label for='first_name'>First Name</label>
          </div>
        </div>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              id='last_name' type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
            <label for='last_name'>Last Name</label>
          </div>
        </div>
      </div>

      {/* email and account type row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              id='email' type="text" className="form-control" placeholder="Email" aria-label="Email" />
            <label for='email'>Email</label>
          </div>
        </div>
        <div className='col-6'>
          <div className='form-floating'>
            <select className="form-select" id="acct_type" onChange={(e) => {
              console.log(e.target.value)
              setNewUser({ ...newUser, isChef: e.target.value })
            }}>
              <option selected value={false}>Consumer</option>
              <option value={true}>Chef</option>
            </select>
            <label for='acct_type'>Consumer or Chef?</label>
          </div>
        </div>
      </div>

      {/* username and password row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              id='username' type="text" className="form-control" placeholder="Username" aria-label="Username" />
            <label for='username'>Userame</label>
          </div>
        </div>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              id='password' type="text" className="form-control" placeholder="Password" aria-label="Password" />
            <label for='password'>Password</label>
          </div>
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-12'>
          <button className='btn btn-success float-end' onClick={registerNewUser}>Register</button>
        </div>
      </div>

    </div >
  )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
