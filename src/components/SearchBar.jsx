import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [searchBar, setSearchBar] = useState({
    inputSearch: false, inputText: '', searchFilter: '' });
  const location = useLocation();
  const { performFetchSearchFilter } = useFetch();
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchBar({
      ...searchBar,
      [name]: value,
    });
  };

  const handleFilter = async () => {
    const { pathname } = location;
    const { inputText, searchFilter } = searchBar;
    let responseFetch = {};
    if (pathname === '/meals') {
      responseFetch = await performFetchSearchFilter('https://www.themealdb.com/api/json/v1/1/', inputText, searchFilter) || { meals: [] };
      if (responseFetch.meals.length === 1) {
        history.push(`/meals/${responseFetch.meals[0].idMeal}`);
      }
    } else {
      responseFetch = await performFetchSearchFilter('https://www.thecocktaildb.com/api/json/v1/1/', inputText, searchFilter) || { drinks: [] };
      console.log(responseFetch);
      if (responseFetch.drinks.length === 1) {
        history.push(`/drinks/${responseFetch.drinks[0].idDrink}`);
      }
    }
  };

  return (
    <>

      <button
        type="button"
        onClick={ () => setSearchBar({
          ...searchBar,
          inputSearch: !searchBar.inputSearch,
        }) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="search pic" />
      </button>

      {searchBar.inputSearch && (
        <div>
          <label htmlFor="search-text">
            <input
              type="text"
              name="inputText"
              value={ searchBar.inputText }
              onChange={ handleChange }
              data-testid="search-input"
            />
          </label>

          <label htmlFor="ingredient">
            <input
              type="radio"
              name="searchFilter"
              id="ingredient"
              value="ingredient"
              onChange={ handleChange }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              name="searchFilter"
              id="name"
              value="name"
              onChange={ handleChange }
              data-testid="name-search-radio"
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              type="radio"
              name="searchFilter"
              id="first-letter"
              value="firstLetter"
              onChange={ handleChange }
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>

          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleFilter }
          >
            Search
          </button>
        </div>
      )}

    </>
  );
}

export default SearchBar;
