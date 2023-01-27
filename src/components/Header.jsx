/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  // const match = useRouteMatch();
  /* const titleLocation = (location.pathname.split('/')[1]);
  const titleUpperLocation = titleLocation[0].toUpperCase()
   + titleLocation.substring(1).replace('-', ' ') */
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

      <button type="button" onClick={ () => history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile pic" />
      </button>
      {/* <h2>{location.match.params}</h2> */}
      <h1 data-testid="page-title">
        {title}
      </h1>
      {(location.pathname === '/meals' || location.pathname === '/drinks') && (
        <button type="button">
          <img data-testid="search-top-btn" src={ searchIcon } alt="search pic" />
        </button>
      )}
    </div>
  );
}

export default Header;
