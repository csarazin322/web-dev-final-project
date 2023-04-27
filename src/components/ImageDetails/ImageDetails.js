import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageDetails.module.css';
import MakeRecipe from '../MakeRecipe/MakeRecipe';
import { getDetailsById } from '../../sercives/shutterstock/shutterstock-services';
import { useDispatch } from 'react-redux';



const ImageDetails = (imageId = '') => {

  cons [sstkResponse, setSstkResponse] = useState({});

  const getImageDetails = async () => {
    const response = await getDetailsById(imageId);
    setSstkResponse(response);
  }

  useEffect(() => {
    console.log('getting image details')
    getImageDetails()
  }, [])

  return (
    <div className={styles.ImageDetails}>
      <div className='row mb-2'>
        <img className='card-img' src={sstkResponse.preview_1000.url}></img>
      </div>
      <div className='row mb-2'>
        <h6>{sstkResponse.description}</h6>
        <p>Image Type: {sstkResponse.image_type}</p> 
      </div>
      <div className='row mb-2'>
        <Link to={`/mr/imageUrl/${sstkResponse.preview_1000.url}`}>
          <button className='btn btn-success float-end'>Select this image</button>
        </Link>
      </div>
    </div>
  );
}

ImageDetails.propTypes = {};

ImageDetails.defaultProps = {};

export default ImageDetails;
