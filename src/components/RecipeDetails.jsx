import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import copy from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';
// import DetailsButtons from './DetailsButtons';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { receipeDetail, ingredientGlobal, recommendationDetail,
    measureGlobal, didMountFetch, construcaoIngredientesArray,
    handleSaveStorage, favorite, setFavorite } = useContext(RecipeDetailsContext);
  const { getLocalStorage } = useLocalStorage();
  const [conditionStartRecipe, setConditionStartRecipe] = useState(true);
  const [conditionInProgressRecipe, setConditionInProgressRecipe] = useState(false);
  const [copied, setCopied] = useState(false);
  const checkLocalStorage = () => {
    const actualStorage = getLocalStorage('favoriteRecipes') || [];
    // console.log(receipeDetail.meals);
    if (receipeDetail.meals) {
      setFavorite(actualStorage
        .some((receipeStorage) => receipeStorage.id === receipeDetail.meals[0].idMeal));
    } else if (receipeDetail.drinks) {
      setFavorite(actualStorage
        .some((receipeStorage) => receipeStorage.id === receipeDetail.drinks[0].idDrink));
    }
  };

  const checkInProgressRecipe = () => {
    const inProgressRecipesObject = getLocalStorage('inProgressRecipes')
    || { drinks: {}, meals: {} };

    if (pathname.includes('/meals') && inProgressRecipesObject.meals) {
      setConditionInProgressRecipe((Object.keys(inProgressRecipesObject.meals))
        .some((progress) => progress === id));
    } else if (pathname.includes('/drinks') && inProgressRecipesObject.drinks) {
      setConditionInProgressRecipe((Object.keys(inProgressRecipesObject.drinks))
        .some((progress) => progress === id));
    }
  };
  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  };
  useEffect(() => {
    if (pathname.includes('/meals')) {
      didMountFetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', id);
    } else {
      didMountFetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', id);
    }
    const doneRecipesArray = getLocalStorage('doneRecipes') || [];
    setConditionStartRecipe(!doneRecipesArray.some((recipe) => recipe.id === id));
    checkInProgressRecipe();
    checkLocalStorage();
  }, []);
  useEffect(() => {
    construcaoIngredientesArray();
    checkLocalStorage();
  }, [receipeDetail]);
  console.log('receipeDetail final', receipeDetail);
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
      {copied && <p>Link copied!</p>}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>

      <button
        type="button"
        // data-testid="favorite-btn"
        onClick={ handleSaveStorage }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
      >
        {favorite ? (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="Favorito"
          />)
          : (
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Não Favorito"
            />
          )}
      </button>
      {conditionStartRecipe && (
        <button
          className="Start-Recipe-detail"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {conditionInProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}
export default RecipeDetails;
