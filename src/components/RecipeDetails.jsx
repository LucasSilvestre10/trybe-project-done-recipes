import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const location = useLocation();
  const { pathname } = location;
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { performFetchReceipeDetail } = useFetch();
  const [receipeDetail, setReceipeDetail] = useState({});
  let ingredientGlobal = [];
  let measureGlobal = [];

  useEffect(() => {
    const didMountFetch = async (url, idMount) => {
      setReceipeDetail(await performFetchReceipeDetail(url, idMount));
    };

    if (pathname.includes('/meals')) {
      didMountFetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', id);
    } else {
      didMountFetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', id);
    }
  }, []);

  if (Object.keys(receipeDetail).length !== 0 && receipeDetail.meals) {
    const measureArray = (Object.entries(receipeDetail.meals[0]))
      .filter((chave) => chave[0].includes('strMeasure')).filter((valor) => valor[1]);
    const measureValue = measureArray.map((measure) => measure[1]);
    // console.log(measureValue);
    const ingredients = (Object.entries(receipeDetail.meals[0]))
      .filter((chave) => chave[0].includes('strIngredient'))
      .filter((_receipe, index) => index < measureArray.length)
      .map((ingredient) => ingredient[1]);
    // console.log(ingredients);
    ingredientGlobal = ingredients;
    measureGlobal = measureValue;
  } else if (Object.keys(receipeDetail).length !== 0 && receipeDetail.drinks) {
    const measureArray = (Object.entries(receipeDetail.drinks[0]))
      .filter((chave) => chave[0].includes('strMeasure')).filter((valor) => valor[1]);
    const measureValue = measureArray.map((measure) => measure[1]);
    // console.log(measureValue);
    const ingredients = (Object.entries(receipeDetail.drinks[0]))
      .filter((chave) => chave[0].includes('strIngredient'))
      .filter((_receipe, index) => index < measureArray.length)
      .map((ingredient) => ingredient[1]);
    // console.log(ingredients);category
    ingredientGlobal = ingredients;
    measureGlobal = measureValue;
  }

  return (
    <div>
      {(pathname.includes('/meals') && Object.keys(receipeDetail).length !== 0) && (
        receipeDetail.meals.map((receipe) => (
          <div key={ id }>
            <img
              src={ receipe.strMealThumb }
              alt={ receipe.strMeal }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ receipe.strMeal }</h1>
            <h2 data-testid="recipe-category">{ receipe.strCategory }</h2>
            {ingredientGlobal.map((ingrediente, index) => (
              <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                <li>
                  `
                  {measureGlobal[index]}
                  {' '}
                  de
                  {' '}
                  {ingrediente}
                  `
                </li>
              </ul>
            ))}
            <p data-testid="instructions">
              Instruções:
              {' '}
              { receipe.strInstructions }
            </p>
            <iframe
              width="853"
              height="480"
              src={ receipe.strYoutube }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
               picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              data-testid="video"
            />
          </div>
        ))
      )}
      {(pathname.includes('/drinks') && Object.keys(receipeDetail).length !== 0) && (
        receipeDetail.drinks.map((receipe) => (
          <div key={ id }>
            <img
              src={ receipe.strDrinkThumb }
              alt={ receipe.strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ receipe.strDrink }</h1>
            <h2 data-testid="recipe-category">{ receipe.strAlcoholic }</h2>
            {ingredientGlobal.map((ingrediente, index) => (
              <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                <li>
                  `
                  {measureGlobal[index]}
                  {' '}
                  de
                  {' '}
                  {ingrediente}
                  `
                </li>
              </ul>
            ))}
            <p data-testid="instructions">
              Instruções:
              {' '}
              { receipe.strInstructions }
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeDetails;
