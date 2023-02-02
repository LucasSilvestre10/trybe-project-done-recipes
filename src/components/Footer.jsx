import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      className="footer-btn"
      data-testid="footer"
    >
      <button
        className="footer-drinks"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          className="footer-img-drinks"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinks pic"
        />
      </button>
      <button
        className="footer-meals"
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img
          className="footer-img-meal"
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal pic"
        />
      </button>
    </footer>
  );
}

export default Footer;
