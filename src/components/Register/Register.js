import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import defaultUser from '../../data/default-user';
import { register } from '../../sercives/user/user-services';
import { useNavigate } from 'react-router';

const Register = () => {
  const [newUser, setNewUser] = useState(defaultUser)
  const navigate = useNavigate()
  const registerNewUser = async () => {
    const response = await register(newUser);
    navigate('/profile')
  }

  const handleOnChange1 = (e) => {
    console.log("at 1")
    setNewUser({ ...newUser, isChef: false })
  }

  const handleOnChange2 = (e) => {
    console.log("at 2")
    setNewUser({ ...newUser, isChef: true })
  }

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
          <p className='mb-1'>Consumer or Chef?</p>
          <div className='row'>
            <div className='col-6'>
              <div className='form-check'>
                <input
                  value={newUser.isChef} onChange={handleOnChange1}
                  className='form-check-input' type='radio' name='acct_type' id='consumer_acct_type' checked />
                <label for='consumer_acct_type'>Consumer</label>
              </div>
            </div>
            <div className='col-6 form-check'>
              <div className='form-check'>
                <input
                  value={newUser.isChef} onChange={handleOnChange2}
                  className='form-check-input' type='radio' name='acct_type' id='chef_acct_type' />
                <label for='chef_acct_type'>Chef</label>
              </div>
            </div>
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
