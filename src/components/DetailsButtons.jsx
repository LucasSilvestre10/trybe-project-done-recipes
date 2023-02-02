import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function DetailsButtons({ state }) {
  const location = useLocation();
  const { pathname } = location;
  const [copied, setCopied] = useState(false);
  const { receipeDetail } = state;
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [favorite, setFavorite] = useState(false);
  console.log(state);
  // console.log(receipeDetail);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  useEffect(() => {
    const actualStorage = getLocalStorage('favoriteRecipes') || [];
    // console.log(receipeDetail.meals);
    if (receipeDetail.meals) {
      setFavorite(actualStorage
        .some((receipeStorage) => receipeStorage.id === receipeDetail.meals[0].idMeal));
    } else if (receipeDetail.drinks) {
      setFavorite(actualStorage
        .some((receipeStorage) => receipeStorage.id === receipeDetail.drinks[0].idDrink));
    }
  }, [receipeDetail]);

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

  return (
    <>
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
    </>
  );
}

DetailsButtons.propTypes = {
  state: PropTypes.shape({
    receipeDetail: PropTypes.shape({
      meals: PropTypes.arrayOf(PropTypes.shape({
        idMeal: PropTypes.string,
        strArea: PropTypes.string,
        strCategory: PropTypes.string,
        strMeal: PropTypes.string,
        strMealThumb: PropTypes.string,
      })),
      drinks: PropTypes.arrayOf(PropTypes.shape({
        idDrink: PropTypes.string,
        strCategory: PropTypes.string,
        strAlcoholic: PropTypes.string,
        strDrink: PropTypes.string,
        strDrinkThumb: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default DetailsButtons;
