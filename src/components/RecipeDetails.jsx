import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const location = useLocation();
  const { pathname } = location;
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { performFetchReceipeDetail, performFetchRecommendation } = useFetch();
  const [receipeDetail, setReceipeDetail] = useState({});
  const [recommendationDetail, setRecommendationDetail] = useState([]);
  let ingredientGlobal = [];
  let measureGlobal = [];
  const NUMBER_RECOMMENDED = 6;
  const NUMBER_VISIBLE = 2;
  console.log(id);

  useEffect(() => {
    const didMountFetch = async (url, idMount) => {
      setReceipeDetail(await performFetchReceipeDetail(url, idMount));
      if (pathname.includes('/meals')) {
        const recommendationResponse = await performFetchRecommendation('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const recommendationGeneral = recommendationResponse.drinks
          .filter((recommend, index) => index < NUMBER_RECOMMENDED)
          .map((recommend, index) => ({ ...recommend, recipeId: index }));

        const recommendationOnePart = recommendationGeneral
          .filter((recommend, index) => index < NUMBER_VISIBLE);
        const recommendationTwoPart = recommendationGeneral
          .filter((recommend, index) => index < NUMBER_VISIBLE * NUMBER_VISIBLE
          && index >= NUMBER_VISIBLE);
        const recommendationThreePart = recommendationGeneral
          .filter((recommend, index) => index >= NUMBER_VISIBLE * NUMBER_VISIBLE
          && index < NUMBER_RECOMMENDED);

        setRecommendationDetail([recommendationOnePart,
          recommendationTwoPart, recommendationThreePart]);
      } else {
        const recommendationResponse = await performFetchRecommendation('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const recommendationGeneral = recommendationResponse.meals
          .filter((recommend, index) => index < NUMBER_RECOMMENDED)
          .map((recommend, index) => ({ ...recommend, recipeId: index }));

        const recommendationOnePart = recommendationGeneral
          .filter((recommend, index) => index < NUMBER_VISIBLE);
        const recommendationTwoPart = recommendationGeneral
          .filter((recommend, index) => index < NUMBER_VISIBLE * NUMBER_VISIBLE
          && index >= NUMBER_VISIBLE);
        const recommendationThreePart = recommendationGeneral
          .filter((recommend, index) => index >= NUMBER_VISIBLE * NUMBER_VISIBLE
          && index < NUMBER_RECOMMENDED);

        setRecommendationDetail([recommendationOnePart,
          recommendationTwoPart, recommendationThreePart]);
      }
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

    const ingredients = (Object.entries(receipeDetail.meals[0]))
      .filter((chave) => chave[0].includes('strIngredient'))
      .filter((_receipe, index) => index < measureArray.length)
      .map((ingredient) => ingredient[1]);

    ingredientGlobal = ingredients;
    measureGlobal = measureValue;
  } else if (Object.keys(receipeDetail).length !== 0 && receipeDetail.drinks) {
    const measureArray = (Object.entries(receipeDetail.drinks[0]))
      .filter((chave) => chave[0].includes('strMeasure')).filter((valor) => valor[1]);
    const measureValue = measureArray.map((measure) => measure[1]);

    const ingredients = (Object.entries(receipeDetail.drinks[0]))
      .filter((chave) => chave[0].includes('strIngredient'))
      .filter((_receipe, index) => index < measureArray.length)
      .map((ingredient) => ingredient[1]);

    ingredientGlobal = ingredients;
    measureGlobal = measureValue;
    console.log(recommendationDetail);
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
      {(pathname.includes('/meals') && recommendationDetail.length !== 0) && (
        <Carousel>
          {recommendationDetail.map((receipes, indexRecommend) => (
            <Carousel.Item key={ indexRecommend }>
              {receipes.map((drink) => (
                <div
                  key={ drink.recipeId }
                  data-testid={ `${drink.recipeId}-recommendation-card` }
                >
                  <h1
                    data-testid={ `${drink.recipeId}-recommendation-title` }
                  >
                    { drink.strDrink }
                  </h1>
                </div>
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {(pathname.includes('/drinks') && recommendationDetail.length !== 0) && (
        <Carousel>
          {recommendationDetail.map((receipes, indexRecommend) => (
            <Carousel.Item key={ indexRecommend }>
              {receipes.map((meal) => (
                <div
                  key={ meal.recipeId }
                  data-testid={ `${meal.recipeId}-recommendation-card` }
                >
                  <h1
                    data-testid={ `${meal.recipeId}-recommendation-title` }
                  >
                    { meal.strMeal }
                  </h1>
                </div>
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <button
        className="Start-Recipe-detail"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
