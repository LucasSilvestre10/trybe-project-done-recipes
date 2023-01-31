import React from 'react';
import { renderHook, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { useLocation, useHistory } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

describe('testa component Recipes na rota /meals', () => {
  let historyTeste = '';

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));

    await act(async () => {
      const { history } = renderWithRouter(<App />, '/meals');
      historyTeste = history;
    });
  });

  test('testa se é renderizado corretamente', () => {
    expect(historyTeste.location.pathname).toBe('/meals');
    mealCategories.meals.slice(0, 5).forEach(({ strCategory: category }) => {
      const filter = screen.getByTestId(`${category}-category-filter`);
      expect(filter).toHaveTextContent(category);
    });
  });
  test('clicar em uma receita difeciona para pagina de detalhes', () => {
    const buttonDetails = screen.getByTestId('0-card-img');
    userEvent.click(buttonDetails);
    expect(historyTeste.location.pathname).toBe('/meals/');
  });
});
