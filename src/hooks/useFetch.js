import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const performFetchSearchFilter = async (url, textFilter, categoryFilter) => {
    setIsLoading(true);
    let response = '';
    let apiResponse = '';
    if (categoryFilter === 'ingredient') {
      response = await fetch(`${url}filter.php?i=${textFilter}`);
      apiResponse = await response.json();
    } else if (categoryFilter === 'name') {
      response = await fetch(`${url}search.php?s=${textFilter}`);
      apiResponse = await response.json();
    } else if (categoryFilter === 'firstLetter') {
      if (textFilter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await fetch(`${url}search.php?f=${textFilter}`);
        apiResponse = await response.json();
      }
    }
    setIsLoading(false);
    return apiResponse;
  };

  return {
    isLoading,
    performFetchSearchFilter,
  };
}

export default useFetch;
