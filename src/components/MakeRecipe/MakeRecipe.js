import React, { useState } from 'react';
import styles from './MakeRecipe.module.css';
import defaultRecipe from '../../data/default-recipe';
import { createRecipe } from '../../sercives/recipe/recipe-services';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from '@reduxjs/toolkit';


const MakeRecipe = ({ imageUrl = 'recipe.png' }) => {
  const [newRecipe, setNewRecipe] = useState(defaultRecipe);
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate()

  const createNewRecipe = async () => {
    const response = await createRecipe({ ...newRecipe, ownerId: currentUser._id });
    navigate('/profile')
  }

  const addIngredient = () => setNewRecipe({
    ...newRecipe,
    ingredients: [...newRecipe.ingredients, {
      id: nanoid(),
      ingredient: '',
      amount: 0,
      measurement: ''
    }]
  })

  const deleteIngredient = (id) => setNewRecipe({
    ...newRecipe,
    ingredients: newRecipe.ingredients.filter((ing) => ing.id !== id)
  })

  const changeIngredient = (id, name, value) => {
    const updatedRecipe = {
      ...newRecipe, ingredients: newRecipe.ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          ingredient[name] = value
        }
        return ingredient
      })
    }
    setNewRecipe(updatedRecipe)
  }


  const addStep = () => setNewRecipe({
    ...newRecipe,
    steps: [...newRecipe.steps, {
      id: nanoid(),
      step: ''
    }]
  })

  const deleteStep = (id) => setNewRecipe({
    ...newRecipe,
    steps: newRecipe.steps.filter((step) => step.id !== id)
  })

  const changeStep = (id, value) => {
    const updatedRecipe = {
      ...newRecipe, steps: newRecipe.steps.map((step) => {
        if (step.id === id) {
          step.step = value
        }
        return step
      })
    }
    setNewRecipe(updatedRecipe)
  }

  return (
    (currentUser && currentUser.isChef) ? (

      < div className={styles.MakeRecipe} >
        <h4 className='mt-4 mb-3'>Create New Recipe</h4>

        {/* Recipe title row */}
        <div className='row mb-2'>
          <div className='col-12'>
            <div className='form-floating'>
              <input
                value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                id='recipe_title' type="text" className="form-control" placeholder="Recipe Title" aria-label="Recipe Title" />
              <label for='recipe_title'>Title</label>
            </div>
          </div>
        </div>

        <div className='row mb-2'>
          <div className='col-12'>
            <div className='card'>
              <img className='card-img' src={imageUrl} alt='loading'></img>
            </div>
          </div>
        </div>

        {/* description row */}
        <div className='row mb-2'>
          <div className='col-12'>
            <div className='form-floating'>
              <textarea
                value={newRecipe.description} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                id='description' type="text" className="form-control" placeholder="About the recipe" aria-label="Description" maxLength='140' rows='3' />
              <label for='description'>Description</label>
            </div>
          </div>
        </div>

        {/* Ingredients List */}
        <div className='card mb-1'>
          <div className='card-body'>
            <h5 className='card-title'>Ingredients List</h5>
            {
              newRecipe.ingredients.map((ingredient) => (
                <div className='row mb-2'>
                  <div className='col-5'>
                    <div className='form'>
                      <input
                        value={ingredient.ingredient} onChange={(e) => changeIngredient(ingredient.id, 'ingredient', e.target.value)}
                        id={`${ingredient.id}_ingredient`} type="text" className="form-control" placeholder="Ingredient" aria-label="Ingredient" />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='form'>
                      <input
                        value={ingredient.amount} onChange={(e) => changeIngredient(ingredient.id, 'amount', e.target.value)}
                        id={`${ingredient.id}_amount`} type="number" className="form-control" placeholder="Amount" aria-label="Amount" />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='form'>
                      <input
                        value={ingredient.measurement} onChange={(e) => changeIngredient(ingredient.id, 'measurement', e.target.value)}
                        id={`${ingredient.id}_measurement`} type="text" className="form-control" placeholder="Measurement" aria-label="Measurement" />
                    </div>
                  </div>
                  <div className='col-1'>
                    <button className='btn btn-danger' onClick={() => deleteIngredient(ingredient.id)}>
                      <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              ))
            }
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <button className='btn btn-secondary w-50' onClick={addIngredient}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Steps list */}
        <div className='card mb-2'>
          <div className='card-body'>
            <h5 className='card-title'>Steps List</h5>
            {
              newRecipe.steps.map((step) => (
                <div className='row mb-2'>
                  <div className='col-11'>
                    <div className='form'>
                      <textarea
                        value={step.step} onChange={(e) => changeStep(step.id, e.target.value)}
                        id={`${step.id}_step`} type="text" className="form-control" placeholder="Step" aria-label="Step" />
                    </div>
                  </div>
                  <div className='col-1'>
                    <button className='btn btn-danger' onClick={() => deleteStep(step.id)}>
                      <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              ))
            }
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <button className='btn btn-secondary w-50' onClick={addStep}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
              </div>
            </div>

          </div>

        </div>

        <div className='row mb-2'>
          <div className='col-12'>
            <button className='btn btn-success float-end' onClick={createNewRecipe}>Create</button>
          </div>
        </div>

      </div >
    )
      : (
        <h3>Only logged in chefs can make recipes</h3>
      )
  )
};

MakeRecipe.propTypes = {};

MakeRecipe.defaultProps = {};

export default MakeRecipe;