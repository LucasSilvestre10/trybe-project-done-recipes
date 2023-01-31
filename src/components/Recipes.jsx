/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const location = useLocation();
  // const history = useHistory();
  const [receipes, setReceipes] = useState([]);
  const [keyPage, setKeyPage] = useState('meals');
  const { fetchAll } = useFetch();

  const funcTest = async () => {
    const result = await fetchAll(location.pathname);
    const newResult = [];
    const MAX_LENG = 12;
    for (let index = 0; index < MAX_LENG; index += 1) {
      newResult.push(result[index]);
    }
    setReceipes(
      newResult,
    );
  };

  useEffect(() => {
    funcTest();
  }, []);

  useEffect(() => {
    const page = location.pathname;
    switch (page) {
    case '/meals':
      setKeyPage('Meal');
      break;
    case '/drinks':
      setKeyPage('Drink');
      break;
    default:
      break;
    }
  }, [receipes]);

  return (
    <>
      {receipes.map((receipe, index) => (
        <div
          key={ receipe.index }
          data-testid={ `${index}-recipe-card` }
        >
          <p data-testid={ `${index}-card-name` }>
            {receipe[`str${keyPage}`]}
          </p>
          <img
            src={ receipe[`str${keyPage}Thumb`] }
            alt=""
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </>
  );
}

export default Recipes;
