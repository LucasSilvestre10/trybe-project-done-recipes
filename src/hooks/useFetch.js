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

  const performFetchReceipeDetail = async (url, id) => {
    setIsLoading(true);
    const response = await fetch(`${url}${id}`);
    const apiResponse = await response.json();
    setIsLoading(false);
    return apiResponse;
  };

  const performFetchRecommendation = async (url) => {
    setIsLoading(true);
    const response = await fetch(`${url}`);
    const apiResponse = await response.json();
    setIsLoading(false);
    return apiResponse;
  };

  return {
    isLoading,
    performFetchSearchFilter,
    performFetchReceipeDetail,
    performFetchRecommendation,
  };
}

export default useFetch;
