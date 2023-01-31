/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../css/Recipes.css';

function Recipes() {
  const location = useLocation();
  // const history = useHistory();
  const [receipes, setReceipes] = useState([]);
  const [keyPage, setKeyPage] = useState('meals');
  const [filters, setFilters] = useState([]);
  const { fetchAllRecipes, fetchCategoris } = useFetch();

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
    setFilters(
      newResult,
    );
  };

  useEffect(() => {
    getRecipes();
    getFilters();
  }, []);

  useEffect(() => {
    const page = location.pathname;
    switch (page) {
    case '/meals':
      setKeyPage('Meal');
      break;
    case '/drinks':
      setKeyPage('Drink');
      break;
    default:
      break;
    }
  }, [receipes]);

  return (
    <div className="recipes-cards">
      <div id="filters" data-testid="filters">
        {
          filters.map((filter, index) => (
            <p
              key={ index }
              data-testid={ `${filter.strCategory}-category-filter` }

            >
              {filter.strCategory}

            </p>

          ))
        }
      </div>
      {receipes.map((receipe, index) => (
        <div
          className="recipes-container"
          key={ receipe.index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
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
        </div>
      ))}
    </div>
  );
}

export default Recipes;
