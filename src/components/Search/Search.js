import React, { useState } from 'react';
import styles from './Search.module.css'
import ssToken from '../../shutterstock/token.js'
// import * as sstk from "shutterstock-api"
import * as sstk from "shutterstock-api"

const Search = () => {
  sstk.setAccessToken(ssToken)

  const api = new sstk.ImagesApi();

  const queryParams = {
    "query": "carbonara",
    "page": "1",
    "per_page": "5"
  };

  const [ssimages, setSsimages] = useState([])

  const images = api.searchImages(queryParams)
    .then(({ data }) => {
      console.log(data);
      setSsimages(data)
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className={styles.Search}>
      {`${JSON.stringify(ssimages)}`}
    </div>
  );
}


Search.propTypes = {};

Search.defaultProps = {};

export default Search;
