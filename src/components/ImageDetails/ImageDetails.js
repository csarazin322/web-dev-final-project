import React, { useEffect, useState } from 'react';
import styles from './ImageDetails.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imageSearchById } from '../../sercives/shutterstock/shutterstock-services';
import { findRecipes } from '../../sercives/recipe/recipe-services';
import Recipe from '../Recipe/Recipe';



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
    setListOfRecipes(
      recipes.filter((recipe) => recipe.image === results.assets.preview_1000.url)
    )
    console.log('here are my list of recipes')
    console.log(listOfRecipes)
  }

  useEffect(() => {
    getPassedImage()
  }, [searchId])

  useEffect(() => {
    getListOfRecipes()
  }, [results])

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
        <button className='btn btn-primary float-end'>Create Recipe!</button>
      </Link>

      <div className='row'>
        <h5 className='col-12'>Recipes made with this image:</h5>
        {listOfRecipes ?
          listOfRecipes.map((recipe) => (
            <div className='col-4'>
              <Recipe recipe={recipe}></Recipe>
            </div>
          )) : ''}

      </div>
    </div>
  );
}

ImageDetails.propTypes = {};

ImageDetails.defaultProps = {};

export default ImageDetails;
