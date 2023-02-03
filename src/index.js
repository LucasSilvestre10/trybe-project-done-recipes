import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <RecipeDetailsProvider>

          <App />

        </RecipeDetailsProvider>

      </RecipesProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
