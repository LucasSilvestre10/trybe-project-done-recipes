import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const performFetchSearchFilter = async (url, textFilter, categoryFilter) => {
    setIsLoading(true);
    let response = '';
    let apiResponse = '';
    const objectResponse = { fetchPerformed: true, apiResponse };
    if (categoryFilter === 'ingredient') {
      response = await fetch(`${url}filter.php?i=${textFilter}`);
      apiResponse = await response.json();
      objectResponse.apiResponse = apiResponse;
    } else if (categoryFilter === 'name') {
      response = await fetch(`${url}search.php?s=${textFilter}`);
      apiResponse = await response.json();
      objectResponse.apiResponse = apiResponse;
    } else if (categoryFilter === 'firstLetter') {
      if (textFilter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        objectResponse.fetchPerformed = false;
      } else {
        response = await fetch(`${url}search.php?f=${textFilter}`);
        apiResponse = await response.json();
        objectResponse.apiResponse = apiResponse;
      }
    }
    setIsLoading(false);
    return objectResponse;
  };

  const fetchAllRecipes = async (page) => {
    let domain = '';

    switch (page) {
    case '/meals':
      domain = 'themeal';
      break;
    case '/drinks':
      domain = 'thecocktail';
      break;
    default:
      break;
    }

    const response = await (await fetch(`https://www.${domain}db.com/api/json/v1/1/search.php?s=`)).json();
    const key = page.replace('/', '');
    const result = response[key];
    return result;
  };

  const fetchCategoris = async (page) => {
    let domain = '';

    switch (page) {
    case '/meals':
      domain = 'themeal';
      break;
    case '/drinks':
      domain = 'thecocktail';
      break;
    default:
      break;
    }
    const response = await (await fetch(`https://www.${domain}db.com/api/json/v1/1/list.php?c=list`)).json();
    const key = page.replace('/', '');
    const result = response[key];

    return result;
  };

  const getRecipesByCategory = async (page, category, selectedFilter) => {
    let domain = '';
    let url = '';

    switch (page) {
    case '/meals':
      domain = 'themeal';
      break;
    case '/drinks':
      domain = 'thecocktail';
      break;
    default:
      break;
    }
    url = category === 'All' || category === selectedFilter
      ? `https://www.${domain}db.com/api/json/v1/1/search.php?s=`
      : `https://www.${domain}db.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await (await fetch(url)).json();
    const key = page.replace('/', '');
    const result = response[key];
    const newResult = [];
    const MAX_LENG = 12;
    for (let index = 0; index < MAX_LENG && result[index]; index += 1) {
      newResult.push(result[index]);
    }

    return newResult;
  };

  return {
    isLoading,
    performFetchSearchFilter,
    fetchAllRecipes,
    fetchCategoris,
    getRecipesByCategory,
  };
}

export default useFetch;
