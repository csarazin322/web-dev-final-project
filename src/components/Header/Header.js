import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import recipe from './recipe.png'


const Header = () => (
  <div className='row row-cols-1'>
    <div>
      {/* <div className="float-end">
      </div> */}
      <img className={`float-end ${styles.logo}`} src={recipe} alt="logo" />
      <h2>Not Yo Mammas Recipes</h2>
      <p>recipes without your grandmother's stories</p>
    </div>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;