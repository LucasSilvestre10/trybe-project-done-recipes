import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const location = useLocation();
  const { pathname } = location;
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { performFetchReceipeDetail } = useFetch();
  const [receipeDetail, setReceipeDetail] = useState({});

  useEffect(() => {
    const didMountFetch = async (url, idMount) => {
      setReceipeDetail(await performFetchReceipeDetail(url, idMount));
    };

    if (pathname.includes('/meals')) {
      didMountFetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', id);
    } else {
      didMountFetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', id);
    }
  }, []);

  console.log(receipeDetail);
  return (
    <div>

      RecipeDetails

    </div>
  );
}

export default RecipeDetails;
