import React from 'react';
import styles from './ChefList.module.css';
import ChefCard from '../ChefCard/ChefCard'
import { findAllChefs } from '../../sercives/user/user-services';


const listOfChefs = findAllChefs();

const ChefList = () => (
  <div className="styles.ChefList">
    <div className='row mt-3'>

    {listOfChefs.map((_) => {
        return (
        <div className='row'>
            {<ChefCard></ChefCard>}
        </div>
        )
    })}
    </div>
  </div>
);

ChefList.propTypes = {};

ChefList.defaultProps = {};

export default ChefList;