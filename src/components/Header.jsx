/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { BiDish } from 'react-icons/bi';
import { HiHeart } from 'react-icons/hi';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

function Header() {
  const location = useLocation();
  const [title, setTitle] = useState('Meals');
  const history = useHistory();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/meals') {
      setTitle('Meals');
    }
    if (pathname === '/drinks') {
      setTitle('Drinks');
    }
    if (pathname === '/drinks') {
      setTitle('Drinks');
    }
    if (pathname === '/profile') {
      setTitle('Profile');
    }
    if (pathname === '/done-recipes') {
      setTitle('Done Recipes');
    }
    if (pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
    }
  }, []);

  return (
    <div>
      <header className="header-container">
        <BiDish className="dish" />
        <HiHeart className="heart" />

        <h5 className="title-header">
          RECIPES
          {' '}
          <strong>app</strong>
        </h5>

        <button
          className="btn-profile"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="img-profile"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile pic"
          />
        </button>
      </header>
      <h1
        className="title-page"
        data-testid="page-title"
      >
        {title}
        {(location.pathname === '/meals' || location.pathname === '/drinks') && (
          <SearchBar />
        )}
      </h1>
    </div>
  );
}

export default Header;
