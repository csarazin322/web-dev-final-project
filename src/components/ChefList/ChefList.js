import React, { useEffect, useState } from 'react';
import styles from './ChefList.module.css';
import ChefCard from '../ChefCard/ChefCard'
import { findAllChefs } from '../../sercives/user/user-services';
import sampleChefs from '../../data/sample-chefs';


// const listOfChefs = sampleChefs;//['waaa', 'woo', 'wee'];//

const ChefList = () => {
  const [chefsList, setChefsList] = useState([])

  const getListOfChefs = async () => {
    const chefs = await findAllChefs()
    const sortedChefs = chefs.sort((chef1, chef2) => chef2.createdRecipeIds.length - chef1.createdRecipeIds.length)
    setChefsList(sortedChefs)
  };

  useEffect(() => {
    console.log('using effect')
    getListOfChefs()
  }, [])

  return (
    <div className="styles.ChefList">
      <div className='row'>
        {chefsList.map((chef) => {
          return (
            <div className='row'>
              {<ChefCard user={chef}></ChefCard>}
            </div>
          )
        })}
      </div>
    </div>
  );
}


ChefList.propTypes = {};

ChefList.defaultProps = {};

export default ChefList;