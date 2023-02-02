import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import searchIcon from '../images/searchIcon.svg';
import { RecipesContext } from '../context/RecipesProvider';

function SearchBar() {
  const [searchBar, setSearchBar] = useState({
    inputSearch: false, inputText: '', searchFilter: '' });
  const location = useLocation();
  const { performFetchSearchFilter } = useFetch();
  const history = useHistory();
  // const [receipesRender, setReceipesRender] = useState([]);
  const { setReceipes } = useContext(RecipesContext);
  const receipeRenderNumber = 12;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchBar({
      ...searchBar,
      [name]: value,
    });
  };

  const checkAndCompleteFetch = (responseFetch) => {
    if (responseFetch.fetchPerformed) {
      if (!responseFetch.apiResponse.meals && !responseFetch.apiResponse.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (responseFetch.apiResponse.meals) {
        if (responseFetch.apiResponse.meals.length === 1) {
          history.push(`/meals/${responseFetch.apiResponse.meals[0].idMeal}`);
        } else {
          setReceipes(responseFetch.apiResponse.meals
            .filter((_receipe, index) => index < receipeRenderNumber));
        }
      } else {
        switch (responseFetch.apiResponse.drinks.length) {
        case 1:
          history.push(`/drinks/${responseFetch.apiResponse.drinks[0].idDrink}`);
          break;
        default:
          setReceipes(responseFetch.apiResponse.drinks
            .filter((_receipe, index) => index < receipeRenderNumber));
          break;
        }
      }
    }
  };

  const handleFilter = async () => {
    const { pathname } = location;
    const { inputText, searchFilter } = searchBar;
    let responseFetch = {};
    if (pathname === '/meals') {
      // responseFetch = await performFetchSearchFilter('https://www.themealdb.com/api/json/v1/1/', inputText, searchFilter);
      responseFetch = await performFetchSearchFilter('meal', inputText, searchFilter);
      checkAndCompleteFetch(responseFetch);
    } else {
      // responseFetch = await performFetchSearchFilter('https://www.thecocktaildb.com/api/json/v1/1/', inputText, searchFilter);
      responseFetch = await performFetchSearchFilter('cocktail', inputText, searchFilter);
      checkAndCompleteFetch(responseFetch);
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
          {/* {location.pathname === '/meals' && (
            receipesRender.map((receipe, index) => (
              <div
                key={ receipe.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ receipe.strMealThumb }
                  alt={ receipe.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <span data-testid={ `${index}-card-name` }>{receipe.strMeal}</span>
              </div>
            ))
          )}
          {location.pathname === '/drinks' && (
            receipesRender.map((receipe, index) => (
              <div
                key={ receipe.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ receipe.strDrinkThumb }
                  alt={ receipe.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <span data-testid={ `${index}-card-name` }>{receipe.strDrink}</span>
              </div>
            ))
          )} */}
        </div>
      )}

    </>
  );
}

export default SearchBar;
