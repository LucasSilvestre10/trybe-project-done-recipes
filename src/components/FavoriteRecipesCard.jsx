import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard() {
  const [recipes, setRecipes] = useState();
  const { getLocalStorage } = useLocalStorage();

  useEffect(() => {
    const localRecipes = getLocalStorage('favoriteRecipes');
    if (localRecipes.length !== 0) {
      setRecipes(localRecipes);
    }
  }, []);

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        {recipes ? (
          recipes.map((recipe, index) => {
            switch (recipe.type) {
            case 'meal':
              return (
                <div key={ index }>
                  <img
                    src={ recipe.image }
                    alt="Imagem"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <span
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </span>
                  <span
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </span>
                  <button>
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Share Icon"
                    />
                  </button>
                  <button>
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="Black Heart Icon"
                    />
                  </button>
                </div>
              );
            case 'drink':
              return (
                <div key={ index }>
                  <img
                    src={ recipe.image }
                    alt="Imagem"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <span
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </span>
                  <span
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </span>
                  <button>
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Share Icon"
                    />
                  </button>
                  <button>
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="Black Heart Icon"
                    />
                  </button>
                </div>
              );
            default:
              return null;
            }
          })
        ) : (
          <p>Não há receitas favoritadas!</p>
        )}
      </div>
    </div>
  );
}

export default FavoriteRecipesCard;
