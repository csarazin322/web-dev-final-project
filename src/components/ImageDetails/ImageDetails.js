import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageDetails.module.css';
import MakeRecipe from '../MakeRecipe/MakeRecipe';



const ImageDetails = (imageUrl = '') => {

  return (
    <div className={styles.ImageDetails}>
    

      
      <Link to={`/mr/imageUrl/${imageUrl}`}>
        <button className='btn btn-success float-end'>Select this image</button>
      </Link>
    </div>
  );
}

ImageDetails.propTypes = {};

ImageDetails.defaultProps = {};

export default ImageDetails;
