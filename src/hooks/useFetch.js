import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const performFetchMeals = async (textFilter, categoryFilter) => {
    setIsLoading(true);
    let response = '';
    let apiResponse = '';
    if (categoryFilter === 'ingredient') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${textFilter}`);
      console.log(response);
      apiResponse = await response.json();
    } else if (categoryFilter === 'name') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${textFilter}`);
      apiResponse = await response.json();
    } else if (categoryFilter === 'firstLetter') {
      if (textFilter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${textFilter}`);
        apiResponse = await response.json();
      }
    }
    setIsLoading(false);
    return apiResponse;
  };

  const performFetchDrinks = async (textFilter, categoryFilter) => {
    setIsLoading(true);
    let response = '';
    let apiResponse = '';
    if (categoryFilter === 'ingredient') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${textFilter}`);
      apiResponse = await response.json();
    } else if (categoryFilter === 'name') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textFilter}`);
      apiResponse = await response.json();
    } else if (categoryFilter === 'firstLetter') {
      if (textFilter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${textFilter}`);
        apiResponse = await response.json();
      }
    }
    setIsLoading(false);
    return apiResponse;
  };
  return {
    isLoading,
    performFetchMeals,
    performFetchDrinks,
  };
}

export default useFetch;
