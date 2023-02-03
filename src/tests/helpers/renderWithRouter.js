import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../../context/RecipesProvider';
import RecipeDetailsProvider from '../../context/RecipeDetailsProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <Router history={ history }>
        <RecipesProvider>
          <RecipeDetailsProvider>

            {component}
          </RecipeDetailsProvider>
        </RecipesProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
