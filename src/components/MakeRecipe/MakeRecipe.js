import React, { useState, useEffect } from 'react';
import styles from './MakeRecipe.module.css';
import defaultRecipe from '../../data/default-recipe';
import { createRecipe } from '../../sercives/recipe/recipe-services';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from '@reduxjs/toolkit';
import { updateUser } from '../../sercives/user/user-services';
import { imageSearchById } from '../../sercives/shutterstock/shutterstock-services';


const MakeRecipe = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(imageId)
  const [results, setResults] = useState(null)
  const [newRecipe, setNewRecipe] = useState(defaultRecipe);
  const { currentUser } = useSelector((state) => state.users);

  const getPassedImage = async () => {
    console.log(searchId)
    if (searchId) {
      const response = await imageSearchById(searchId).then((data) => {
        setResults(data)
      })
    }
  }

  useEffect(() => {
    getPassedImage()
  }, [searchId])

  const createNewRecipe = async () => {
    let newId = ''
    const response = await createRecipe({
      ...newRecipe, ownerId: currentUser._id,
      image: (results) ? results.assets.preview_1000.url : '/recipe.png'
    }).then(async (resp) => {
      console.log(resp)
      await dispatch(updateUser({ ...currentUser, createdRecipeIds: [...currentUser.createdRecipeIds, resp._id] }))
    }).catch(err => err);
    console.log('other response')
    console.log(response)
    navigate(`/profile`)
  }

  const addIngredient = () => setNewRecipe({
    ...newRecipe,
    ingredients: [...newRecipe.ingredients, {
      uiid: nanoid(),
      ingredient: '',
      amount: 0,
      measurement: ''
    }]
  })

  const deleteIngredient = (uiid) => setNewRecipe({
    ...newRecipe,
    ingredients: newRecipe.ingredients.filter((ing) => ing.uiid !== uiid)
  })

  const changeIngredient = (uiid, name, value) => {
    const updatedRecipe = {
      ...newRecipe, ingredients: newRecipe.ingredients.map((ingredient) => {
        if (ingredient.uiid === uiid) {
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
      uiid: nanoid(),
      step: ''
    }]
  })

  const deleteStep = (uiid) => setNewRecipe({
    ...newRecipe,
    steps: newRecipe.steps.filter((step) => step.uiid !== uiid)
  })

  const changeStep = (uiid, value) => {
    const updatedRecipe = {
      ...newRecipe, steps: newRecipe.steps.map((step) => {
        if (step.uiid === uiid) {
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
              <img className='card-img' src={results ? results.assets.preview_1000.url : ''} alt='loading'></img>
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
                        value={ingredient.ingredient} onChange={(e) => changeIngredient(ingredient.uiid, 'ingredient', e.target.value)}
                        id={`${ingredient.uiid}_ingredient`} type="text" className="form-control" placeholder="Ingredient" aria-label="Ingredient" />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='form'>
                      <input
                        value={ingredient.amount} onChange={(e) => changeIngredient(ingredient.uiid, 'amount', e.target.value)}
                        id={`${ingredient.uiid}_amount`} type="number" className="form-control" placeholder="Amount" aria-label="Amount" />
                    </div>
                  </div>
                  <div className='col-3'>
                    <div className='form'>
                      <input
                        value={ingredient.measurement} onChange={(e) => changeIngredient(ingredient.uiid, 'measurement', e.target.value)}
                        id={`${ingredient.uiid}_measurement`} type="text" className="form-control" placeholder="Measurement" aria-label="Measurement" />
                    </div>
                  </div>
                  <div className='col-1'>
                    <button className='btn btn-danger' onClick={() => deleteIngredient(ingredient.uiid)}>
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
                        value={step.step} onChange={(e) => changeStep(step.uiid, e.target.value)}
                        id={`${step.uiid}_step`} type="text" className="form-control" placeholder="Step" aria-label="Step" />
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