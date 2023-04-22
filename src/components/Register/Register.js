import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import defaultUser from '../../data/default-user';
import { register } from '../../sercives/user/user-services';

const Register = () => {
  const [newUser, setNewUser] = useState(defaultUser)
  const registerNewUser = async () => {
    await register(newUser);
  }

  return (
    < div className={styles.Register} >
      <h4 className='mt-4 mb-3'>Register</h4>

      {/* first and last name row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <label for='first_name'>First Name</label>
          <input
            value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            id='first_name' type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
        </div>
        <div className='col-6'>
          <label for='last_name'>Last Name</label>
          <input
            value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            id='last_name' type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
        </div>
      </div>

      {/* email and account type row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <label for='email'>Email</label>
          <input
            value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            id='email' type="text" className="form-control" placeholder="Email" aria-label="Email" />
        </div>
        <div className='col-6'>
          <label className=''>Consumer or Chef?</label>
          <div className='row'>
            <div className='col-6'>
              <div className='form-check'>
                <input
                  value={newUser.isChef} onChange={(e) => setNewUser({ ...newUser, userRole: !e.target.checked })}
                  className='form-check-input' type='radio' name='acct_type' id='consumer_acct_type' checked />
                <label for='consumer_acct_type'>Consumer</label>
              </div>
            </div>
            <div className='col-6 form-check'>
              <div className='form-check'>
                <input
                  value={newUser.isChef} onChange={(e) => setNewUser({ ...newUser, userRole: e.target.checked })}
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
          <label for='username'>Userame</label>
          <input
            value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            id='username' type="text" className="form-control" placeholder="Username" aria-label="Username" />
        </div>
        <div className='col-6'>
          <label for='password'>Password</label>
          <input
            value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            id='password' type="text" className="form-control" placeholder="Password" aria-label="Password" />
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
