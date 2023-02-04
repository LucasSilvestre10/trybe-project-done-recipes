/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import '../css/Recipes.css';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

// chave do local 'doneRecipes'
function DoneRecipes() {
  const [listCompletedRecipes, setListCompletedRecipes] = useState([]);
  const [idShare, setIdShare] = useState();
  // const [filtersCategory, setFiltersCategory] = useState()
  const { getLocalStorage } = useLocalStorage();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const result = getLocalStorage('doneRecipes');
    // console.log('result in useEffect', result);

    setListCompletedRecipes(result);
  }, []);

  const buttonShare = (event) => {
    const { id } = event.currentTarget;
    copy(`http://localhost:3000/${id}`);
    setIdShare(id);
  };

  const setFilters = (event) => {
    const { value } = event.target;
    const ListStorage = getLocalStorage('doneRecipes');

    let newList = [];

    if (value === 'Meals') {
      newList = ListStorage.filter((recipe) => recipe.type === 'meal');
    }
    if (value === 'Drinks') {
      newList = ListStorage.filter((recipe) => recipe.type === 'drink');
    }
    if (value === 'All') {
      newList = ListStorage;
    }
    // console.log('console newList', newList);
    setListCompletedRecipes(newList);
  };

  const goToDetails = (event) => {
    const { id } = event.currentTarget;
    history.push(`/${id}`);
  };

  return (
    <div>
      <button
        value="All"
        onClick={ setFilters }
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        value="Meals"
        onClick={ setFilters }
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        value="Drinks"
        onClick={ setFilters }
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>

      {listCompletedRecipes.map((recipe, index) => (
        <div
          key={ index }
          className="recipes-container"
        >
          <button
            id={ `${recipe.type}s/${recipe.id}` }
            onClick={ goToDetails }
          >
            <img
              className="recipes-img"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality}${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </p>
          <button
            type="button"
            onClick={ buttonShare }
            id={ `${recipe.type}s/${recipe.id}` }

          >
            {`${recipe.type}s/${recipe.id}` === idShare
            && <p data-testid={ `${index}-horizontal-share-btn` }> Link copied!</p>}
            {`${recipe.type}s/${recipe.id}` !== idShare && <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Compartilhar"
            />}

          </button>
          {recipe.tags.map((tag, indexTag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ indexTag }
            >
              {tag}

            </p>
          ))}
        </div>
      ))}

    </div>
  );
}

export default DoneRecipes;
