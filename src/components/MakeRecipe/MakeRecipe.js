import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
import defaultRecipe from '../../data/default-recipe';
import { createRecipe } from '../../sercives/recipe/recipe-services';
import { useNavigate } from 'react-router';
import { current } from '@reduxjs/toolkit';

const MakeRecipe = (imageId = '') => {
  const [newRecipe, setNewRecipe] = useState(defaultRecipe);

  const { currentUser } = useSelector((state) => state.users);

  currentUser ? ( currentUser.isChef ?
    setNewRecipe({ ...newRecipe, ownerId : currentUser._id})
    : setNewRecipe({ ...newRecipe, ownerId : 'unknown'}))
  : setNewRecipe({ ...newRecipe, ownerId : 'unknown'});

  setNewRecipe({ ... newRecipe, image : imageId})

  const navigate = useNavigate()
  const createNewRecipe = async () => {
    const response = await createRecipe(newRecipe);
    navigate('/profile')
  }

  const handleOnChange1 = (e) => {
    console.log("at 1")
    setNewRecipe({ ...newUser, isChef: false })
  }

  const handleOnChange2 = (e) => {
    console.log("at 2")
    setNewUser({ ...newUser, isChef: true })
  }

  return (
    < div className={styles.Register} >
      <h4 className='mt-4 mb-3'>Register New User</h4>

      {/* Recipe title row */}
      <div className='row mb-2'>
        <div className='col-12'>
          <div className='form-floating'>
            <input
              value={newUser.firstName} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              id='recipe_title' type="text" className="form-control" placeholder="Recipe Title" aria-label="Recipe Title" />
            <label for='recipe_title'>Title</label>
          </div>
        </div>
      </div>

      {/* description row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.email} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
              id='description' type="text" className="form-control" placeholder="About the recipe" aria-label="Description" />
            <label for='description'>Description</label>
          </div>
        </div>
      </div>

      {/* username and password row */}
      <div className='row mb-2'>
        
      </div>

      <div className='row mb-2'>
        <div className='col-12'>
          <button className='btn btn-success float-end' onClick={createNewRecipe}>Create</button>
        </div>
      </div>

    </div >
  )
};

MakeRecipe.propTypes = {};

MakeRecipe.defaultProps = {};

export default MakeRecipe;