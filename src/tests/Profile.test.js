import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('teste do component de Profile', () => {
  let historyTeste = '';
  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
    };
    const mockKey = 'user';
    const mockJson = { email: 'trybe@trybe.com' };
    setLocalStorage(mockKey, mockJson);
    const { history } = renderWithRouter(<App />, '/profile');
    historyTeste = history;
  });

  test('teste se ao clicar no botão de Done Recipes direciona para a tela corretamente', () => {
    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(buttonDoneRecipes);
    expect(historyTeste.location.pathname).toBe('/done-recipes');
  });
  test('teste se ao clicar no botão de Favorite Recipes direciona para a tela corretamente', () => {
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavoriteRecipes);
    expect(historyTeste.location.pathname).toBe('/favorite-recipes');
  });
  test('teste se ao clicar no botão de Logout direciona para a tela corretamente e limpa o localStorage', () => {
    const buttonFavoriteRecipes = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonFavoriteRecipes);
    expect(historyTeste.location.pathname).toBe('/');
    /* const allItems = window.localStorage.length();
    console.log(allItems); */
  });
});
