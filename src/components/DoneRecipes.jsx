/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';

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
  const { pathname } = useLocation();
  const [listCompletedRecipes, setListCompletedRecipes] = useState([]);
  const [idShare, setIdShare] = useState();
  // const [filtersCategory, setFiltersCategory] = useState()
  const { getLocalStorage } = useLocalStorage();

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const result = getLocalStorage('doneRecipes');
    console.log(result);
    setListCompletedRecipes(result);
  }, []);

  const buttonShare = (event) => {
    const { id } = event.currentTarget;
    copy(`http://localhost:3000/${id}`);
    setIdShare(id);
  };

  return (
    <div>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {/* {
        listCompletedRecipes === []
       && <p>Nenhuma Receita concluída encontrada!</p>
      } */}
      {listCompletedRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </p>
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
