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
        <input type="text" data-testid="search-input" />
      )}

    </>
  );
}

export default SearchBar;
