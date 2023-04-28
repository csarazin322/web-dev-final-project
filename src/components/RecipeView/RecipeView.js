import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './RecipeView.module.css';
import { useParams } from 'react-router';
import defaultRecipe from '../../data/default-recipe';
import { findRecipeById } from '../../sercives/recipe/recipe-services';
import { useSelector } from 'react-redux';

const RecipeView = () => {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState(defaultRecipe)
  const { currrentUser } = useSelector((state) => state.users)

  const getLinkedRecipe = async () => {
    if (recipeId) {
      const response = await findRecipeById(recipeId).then(data => {
        if (data !== 404) {
          setRecipe(data)
        } else {
          setRecipe({ _id: 404 })
        }
      })
    }
  }

  useEffect(() => {
    getLinkedRecipe()
  }, [recipeId])

  return (
    <div className={styles.RecipeView}>
      {
        recipe._id === 404 ?
          <h4 className='mt-3'>Recipe Not Found</h4>
          : (
            <div className='row mt-3 mb-3'>
              <div className='col-12'>
                <div className='card'>
                  <img className='card-img-top' src={recipe.image} a='loading'></img>
                  <div className='card-body'>
                    <h2 className='card-title'>{recipe.title}</h2>
                    <p className='card-text'>{recipe.description}</p>
                    <ul className='list-group list-group-flush mb-3'>
                      <li className='list-group-item'>
                        <h4>Ingredients List</h4>
                        {
                          recipe.ingredients.map(({ ingredient, amount, measurement }) => {
                            return (
                              <li className='list-group-item'>
                                <p className='mb-0'>
                                  {`- ${amount} ${measurement} of ${ingredient}`}
                                </p>
                              </li>
                            )
                          })
                        }
                      </li>
                    </ul>

                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item'>
                        <h4>Directions</h4>
                        {
                          recipe.steps.map(({ step }) => {
                            return (
                              <li className='list-group-item'>
                                <p className='mb-0'>
                                  {`- ${step}`}
                                </p>
                              </li>
                            )
                          })
                        }
                      </li>
                    </ul>

                    {/* <div className='row'>

              </div> */}
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </div>
  );
}


RecipeView.propTypes = {};

RecipeView.defaultProps = {};

export default RecipeView;
