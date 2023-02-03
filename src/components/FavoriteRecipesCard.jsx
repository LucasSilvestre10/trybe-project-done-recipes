import React from 'react';

function FavoriteRecipesCard() {
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
        <img
          src="/"
          alt="Imagem de teste"
          data-testid={ `${index}-horizontal-image` }
        />
        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          Aqui é o texto da categoria da receita
        </span>
        <span
          data-testid={ `${index}-horizontal-name` }
        >
          Aqui é o nome da receita

        </span>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
        >
          Compartilhar

        </button>
        <button
          data-testid={ `${index}-horizontal-favorite-btn` }
        >
          Favoritar

        </button>
      </div>
    </div>
  );
}

export default FavoriteRecipesCard;
