import React from 'react';
import styles from './ChefCard.module.css';
import { useSelector } from 'react-redux';


const ChefCard = (user = defaultUser) => {



return (
<div className={styles.ChefCard}>
    <div className='card'>
      <img className='card-img-left' src={recipeImg} alt={recipeImg} />
      <div className='card-body'>
        <h5 className='card-title'>
          {user.username}
        </h5>
        <button className='btn'/>
      </div>
    </div>
  </div>
)

}