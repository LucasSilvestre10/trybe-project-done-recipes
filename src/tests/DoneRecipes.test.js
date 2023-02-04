import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const HORIZONTAL_NAME = '0-horizontal-name';
const BUTTON_FILTER_MEAL = 'filter-by-meal-btn';
const BUTTON_FILTER_DRINK = 'filter-by-drink-btn';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
describe('testa component DoneRecipes na rota /done-recipes', () => {
  let historyTeste = '';
  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    const mockKey = 'doneRecipes';

    setLocalStorage(mockKey, doneRecipes);

    //    global.fetch = fetch;

    const { history } = renderWithRouter(
      <App />,
      '/done-recipes',
    );
    historyTeste = history;
  });

  test('testa se é renderizado corretamente', () => {
    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    expect(buttonShare).toBeDefined();
  });

  test('should first DEPOIS', () => {
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId(BUTTON_FILTER_MEAL);
    const filterDrink = screen.getByTestId(BUTTON_FILTER_DRINK);
    expect(filterAll).toBeDefined();
    expect(filterMeal).toBeDefined();
    expect(filterDrink).toBeDefined();
  });

  test('should first', () => {
    const filterDrink = screen.getByTestId(BUTTON_FILTER_DRINK);

    userEvent.click(filterDrink);

    const recipeDrink = screen.getByTestId(HORIZONTAL_NAME);
    expect(recipeDrink).toHaveTextContent('Aquamarine');

    const filterMeal = screen.getByTestId(BUTTON_FILTER_MEAL);

    userEvent.click(filterMeal);

    const recipeMeal = screen.getByTestId(HORIZONTAL_NAME);
    expect(recipeMeal).toHaveTextContent(doneRecipes[0].name);

    const filterAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    const recipe1 = screen.getByTestId(HORIZONTAL_NAME);
    const recipe2 = screen.getByTestId('1-horizontal-name');
    expect(recipe1).toHaveTextContent(doneRecipes[0].name);
    expect(recipe2).toHaveTextContent('Aquamarine');
  });

  test('testa se ao clicar em uma receita direciona para detales', () => {
    const recipe = screen.getByTestId('0-horizontal-image');
    userEvent.click(recipe);
    expect(historyTeste.location.pathname).toBe('/meals/52771');
  });

  test('se botão de copia esta funcionando corretamente', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });
});
