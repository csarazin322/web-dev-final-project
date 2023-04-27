import React, { useEffect, useState } from 'react';
import styles from './Search.module.css'
import { useNavigate, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { imageSearch } from '../../sercives/shutterstock/shutterstock-services';


const Search = () => {
  const { term } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(term)
  const [results, setResults] = useState([])

  const searchShutterstock = async () => {
    const queryImages = await imageSearch(searchTerm)
    setResults(queryImages)
    navigate(`/search/${searchTerm}`)
  }

  useEffect(() => {
    if (term) {
      searchShutterstock()
    }
  }, [term])

  const logo = require('../../logo.svg')

  return (
    <div className={styles.Search}>
      <div className='row mt-3 mb-3'>
        <div className='col-12 d-flex justify-content-center mb-3'>
          <div className='input-group w-75'>
            <div className='form-floating'>
              <input
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                id='search' type="text" className="form-control" placeholder="Search" aria-label="Search" />
              <label for='search'>Search</label>
            </div>
            <button type='button' className='btn btn-primary' onClick={searchShutterstock}>
              <FontAwesomeIcon className='ms-4 me-4' size='xl' icon={faSearch}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className='row mb-3'>
        {
          results.map((imgResult) => (
            <div className='col-3 mb-2'>
              <div className='card'>
                <img className='card-img' src={imgResult.assets.preview_1000.url} alt='loading'></img>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}


Search.propTypes = {};

Search.defaultProps = {};

export default Search;
