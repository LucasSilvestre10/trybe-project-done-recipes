/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../css/Recipes.css';
import { RecipesContext } from '../context/RecipesProvider';

function Recipes() {
  const location = useLocation();
  const history = useHistory();
  // const [receipes, setReceipes] = useState([]);
  const { receipes, setReceipes } = useContext(RecipesContext);
  const [keyPage, setKeyPage] = useState('meals');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filtersCategorys, setFiltersCategorys] = useState([]);
  const { fetchAllRecipes, fetchCategoris, getRecipesByCategory } = useFetch();

  // const checkAndCompleteFetch = (responseFetch) => {
  //   if (responseFetch.fetchPerformed) {
  //     if (!responseFetch.apiResponse.meals && !responseFetch.apiResponse.drinks) {
  //       global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //     } else if (responseFetch.apiResponse.meals) {
  //       if (responseFetch.apiResponse.meals.length === 1) {
  //         history.push(`/meals/${responseFetch.apiResponse.meals[0].idMeal}`);
  //       } else {
  //         setReceipesRender(responseFetch.apiResponse.meals
  //           .filter((_receipe, index) => index < receipeRenderNumber));
  //       }
  //     } else {
  //       switch (responseFetch.apiResponse.drinks.length) {
  //       case 1:
  //         history.push(`/drinks/${responseFetch.apiResponse.drinks[0].idDrink}`);
  //         break;
  //       default:
  //         setReceipesRender(responseFetch.apiResponse.drinks
  //           .filter((_receipe, index) => index < receipeRenderNumber));
  //         break;
  //       }
  //     }
  //   }
  // };

  const getRecipes = async () => {
    const result = await fetchAllRecipes(location.pathname);
    const newResult = [];
    const MAX_LENG = 12;
    for (let index = 0; index < MAX_LENG; index += 1) {
      newResult.push(result[index]);
    }
    setReceipes(
      newResult,
    );
  };
  const getFilters = async () => {
    const result = await fetchCategoris(location.pathname);
    const newResult = [];
    const MAX_LENG = 5;
    for (let index = 0; index < MAX_LENG; index += 1) {
      newResult.push(result[index]);
    }
    setFiltersCategorys(
      newResult,
    );
  };

  useEffect(() => {
    getRecipes();
    getFilters();
  }, []);

  useEffect(() => {
    const page = location.pathname;
    if (page === '/meals') {
      setKeyPage('Meal');
    }
    if (page === '/drinks') {
      setKeyPage('Drink');
    }
  }, [receipes]);

  const setFilter = async (event) => {
    const { innerText } = event.target;
    const result = await getRecipesByCategory(
      location.pathname,
      innerText,
      selectedFilter,
    );

    setReceipes(result);
    setSelectedFilter(innerText);
  };

  const goToDetails = (event) => {
    const { id } = event.target;
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <div className="recipes-cards">
      <button
        className="recipes-category-btn"
        data-testid="All-category-filter"
        onClick={ setFilter }
      >
        All

      </button>
      {
        filtersCategorys.map((filter, index) => (
          <button
            className="recipes-category-btn"
            key={ `${filter.strCategory}-${index}` }
            data-testid={ `${filter.strCategory}-category-filter` }
            onClick={ setFilter }
          >
            {filter.strCategory}

          </button>
        ))
      }
      {receipes.map((receipe, index) => (
        <div
          className="recipes-container"
          key={ receipe[`id${keyPage}`] }
          data-testid={ `${index}-recipe-card` }
        >
          <button
            onClick={ (event) => goToDetails(event) }
          >

            <img
              id={ receipe[`id${keyPage}`] }
              className="recipes-img"
              src={ receipe[`str${keyPage}Thumb`] }
              alt=""
              data-testid={ `${index}-card-img` }
            />
            <p
              className="recipes-name"
              data-testid={ `${index}-card-name` }
            >
              {receipe[`str${keyPage}`]}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
