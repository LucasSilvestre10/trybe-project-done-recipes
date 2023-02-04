import React, { createContext, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

export const RecipeDetailsContext = createContext();

function RecipeDetailsProvider({ children }) {
  const [receipeDetail, setReceipeDetail] = useState({});
  const [ingredientGlobal, setIngredientGlobal] = useState([]);
  const [measureGlobal, setMeasureGlobal] = useState([]);
  const [recommendationDetail, setRecommendationDetail] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const { performFetchReceipeDetail, performFetchRecommendation } = useFetch();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const NUMBER_RECOMMENDED = 6;
  const NUMBER_VISIBLE = 2;

  const didMountFetch = async (url, idMount) => {
    setReceipeDetail(await performFetchReceipeDetail(url, idMount));
    if (url.includes('themeal')) {
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

  const construcaoIngredientesArray = () => {
    if (Object.keys(receipeDetail).length !== 0 && receipeDetail.meals) {
      const measureArray = (Object.entries(receipeDetail.meals[0]))
        .filter((chave) => chave[0].includes('strMeasure')).filter((valor) => valor[1]);
      const measureValue = measureArray.map((measure) => measure[1]);
      const ingredients = (Object.entries(receipeDetail.meals[0]))
        .filter((chave) => chave[0].includes('strIngredient'))
        .filter((_receipe, index) => index < measureArray.length)
        .map((ingredient) => ingredient[1]);
      setIngredientGlobal(ingredients);
      setMeasureGlobal(measureValue);
    } else if (Object.keys(receipeDetail).length !== 0 && receipeDetail.drinks) {
      const measureArray = (Object.entries(receipeDetail.drinks[0]))
        .filter((chave) => chave[0].includes('strMeasure')).filter((valor) => valor[1]);
      const measureValue = measureArray.map((measure) => measure[1]);
      const ingredients = (Object.entries(receipeDetail.drinks[0]))
        .filter((chave) => chave[0].includes('strIngredient'))
        .filter((_receipe, index) => index < measureArray.length)
        .map((ingredient) => ingredient[1]);
      setIngredientGlobal(ingredients);
      setMeasureGlobal(measureValue);
    }
  };

  const handleSaveStorage = () => {
    if (favorite) {
      const oldStorage = getLocalStorage('favoriteRecipes');

      if (receipeDetail.meals) {
        const newStorage = oldStorage
          .filter(({ id }) => id !== receipeDetail.meals[0].idMeal);
        setLocalStorage('favoriteRecipes', newStorage);
      } else if (receipeDetail.drinks) {
        const newStorage = oldStorage
          .filter(({ id }) => id !== receipeDetail.drinks[0].idDrink);

        setLocalStorage('favoriteRecipes', newStorage);
      }
      setFavorite(false);
    } else {
      const oldStorage = getLocalStorage('favoriteRecipes') || [];
      let objetoAtualRecipe = {};
      if (receipeDetail.meals) {
        objetoAtualRecipe = {
          id: receipeDetail.meals[0].idMeal,
          type: 'meal',
          nationality: receipeDetail.meals[0].strArea,
          category: receipeDetail.meals[0].strCategory,
          alcoholicOrNot: '',
          name: receipeDetail.meals[0].strMeal,
          image: receipeDetail.meals[0].strMealThumb,
        };
      } else if (receipeDetail.drinks) {
        objetoAtualRecipe = {
          id: receipeDetail.drinks[0].idDrink,
          type: 'drink',
          nationality: '',
          category: receipeDetail.drinks[0].strCategory,
          alcoholicOrNot: receipeDetail.drinks[0].strAlcoholic,
          name: receipeDetail.drinks[0].strDrink,
          image: receipeDetail.drinks[0].strDrinkThumb,
        };
      }
      const actualStorage = [...oldStorage, objetoAtualRecipe];
      setLocalStorage('favoriteRecipes', actualStorage);
      setFavorite(true);
    }
  };

  const values = useMemo(() => ({
    receipeDetail,
    ingredientGlobal,
    measureGlobal,
    recommendationDetail,
    favorite,
    setFavorite,
    didMountFetch,
    construcaoIngredientesArray,
    handleSaveStorage,
  }), [receipeDetail, ingredientGlobal, measureGlobal, recommendationDetail, favorite]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      { children }
    </RecipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {}.isRequired;

export default RecipeDetailsProvider;
