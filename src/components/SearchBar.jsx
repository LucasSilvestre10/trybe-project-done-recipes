import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [searchBar, setSearchBar] = useState({ inputSearch: false });
  return (
    <>

      <button
        type="button"
        onClick={ () => setSearchBar({
          ...searchBar,
          inputSearch: !searchBar.inputSearch,
        }) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="search pic" />
      </button>

      {searchBar.inputSearch && (
        <div>
          <label htmlFor="search-text">
            <input
              type="text"
              name="search-text"
              data-testid="search-input"
            />
          </label>

          <label htmlFor="ingredient">
            <input
              type="radio"
              name="searchFilter"
              id="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              type="radio"
              name="searchFilter"
              id="name"
              data-testid="name-search-radio"
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              type="radio"
              name="searchFilter"
              id="first-letter"
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>

          <button type="button" data-testid="exec-search-btn">Search</button>
        </div>
      )}

    </>
  );
}

export default SearchBar;
