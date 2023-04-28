import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageDetails.module.css';
import MakeRecipe from '../MakeRecipe/MakeRecipe';
import { findRecipes } from '../../sercives/recipe/recipe-services';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imageSearchById } from '../../sercives/shutterstock/shutterstock-services';



const ImageDetails = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(imageId)
  const [results, setResults] = useState(null)
  const [listOfRecipes, setListOfRecipes] = useState([])

  const getPassedImage = async () => {
    if (searchId) {
      const response = await imageSearchById(searchId).then((data) => {
        console.log(data)
        setResults(data)
        console.log('these are results')
        console.log(results)
      })
    }
  }


  const getListOfRecipes = async () => {
    const recipes = await findRecipes();
    recipes.filter((recipe) => recipe.image === results.assets.preview_1000.url)
    setListOfRecipes(recipes)
  }

  useEffect(() => {
    getPassedImage()
    getListOfRecipes()
  }, [searchId])

  return (
    <div className={styles.ImageDetails}>
      <div className='row mt-3 mb-3'>
        <div className='col-12'>
          <h3>{`Details for Image with ID: ${searchId}`}</h3>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-12'>
          <div className='card'>
            <img className='card-img' src={(results) ? results.assets.preview_1000.url : ''} a='invalid url' />
          </div>
        </div>
        <div className='col-12'>
          <p>{results ? results.description : ''}</p>
        </div>
      </div>


      <Link to={`/mr/${imageId}`}>
        <button className='btn btn-primary float-end row'>Create Recipe!</button>
      </Link>


      <h5 className='row col-12'>Recipes made with this image:</h5>
      {listOfRecipes.map((recipe) => {
        //Replace with whatever the correct path is for the recipe page for a given recipe id
        <Link to={`/recipe/${recipe._id}`}>
          <div className='row mb-2'>
            <h6>{recipe.title}</h6>
            <p>{recipe.description}</p>
          </div>
        </Link>
      })}
    </div>
  );
}

ImageDetails.propTypes = {};

ImageDetails.defaultProps = {};

export default ImageDetails;
