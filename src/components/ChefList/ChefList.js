import React from 'react';
import styles from './ChefList.module.css';
import ChefCard from '../ChefCard/ChefCard'
import { findAllChefs } from '../../sercives/user/user-services';
import sampleChefs from '../../data/sample-chefs';


const listOfChefs = sampleChefs;//['waaa', 'woo', 'wee'];//findAllChefs();

const ChefList = () => (
  <div className="styles.ChefList">
    <div className='row mt-3'>



    {listOfChefs.map((chef) => {
        return (
        <div className='row'>
            {<ChefCard user={chef}></ChefCard>}
        </div>
        )
    })}
    </div>
  </div>
);

ChefList.propTypes = {};

ChefList.defaultProps = {};

export default ChefList;