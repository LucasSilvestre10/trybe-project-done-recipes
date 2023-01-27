import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testIDProfile = 'profile-top-btn';
const testIDTitle = 'page-title';
const testIDSearch = 'search-top-btn';

describe('Testes para o Header', () => {
  test('Verifica a rota "/meals"', () => {
    const component = renderWithRouter(<App />, '/meals');
    const historyTeste = component.history;
    const iconProfile = screen.getByTestId(testIDProfile);
    const title = screen.getByTestId(testIDTitle);
    const search = screen.getByTestId(testIDSearch);

    expect(iconProfile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
    expect(historyTeste.location.pathname).toBe('/meals');
  });

  test('Verifica a rota "/drinks"', () => {
    const component = renderWithRouter(<App />, '/drinks');
    const historyTeste = component.history;
    const iconProfile = screen.getByTestId(testIDProfile);
    const title = screen.getByTestId(testIDTitle);
    const search = screen.getByTestId(testIDSearch);

    expect(iconProfile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toHaveTextContent('Drinks');
    expect(historyTeste.location.pathname).toBe('/drinks');
  });

  test('Verifica a rota "/profile"', () => {
    const component = renderWithRouter(<App />, '/profile');
    const historyTeste = component.history;
    const iconElementProfile = screen.getByTestId(testIDProfile);
    const titleProfile = screen.getByTestId(testIDTitle);
    const searchElementProfile = screen.queryByTestId(testIDSearch);

    expect(iconElementProfile).toBeInTheDocument();
    expect(titleProfile).toBeInTheDocument();
    expect(searchElementProfile).not.toBeInTheDocument();
    expect(titleProfile).toHaveTextContent('Profile');
    expect(historyTeste.location.pathname).toBe('/profile');
  });

  test('Verifica a rota "/done-recipes"', () => {
    const component = renderWithRouter(<App />, '/done-recipes');
    const historyTeste = component.history;
    const iconElementDoneRecipes = screen.getByTestId(testIDProfile);
    const titleDoneRecipes = screen.getByTestId(testIDTitle);
    const searchElementDoneRecipes = screen.queryByTestId(testIDSearch);

    expect(iconElementDoneRecipes).toBeInTheDocument();
    expect(titleDoneRecipes).toBeInTheDocument();
    expect(searchElementDoneRecipes).not.toBeInTheDocument();
    expect(titleDoneRecipes).toHaveTextContent('Done Recipes');
    expect(historyTeste.location.pathname).toBe('/done-recipes');
  });

  test('Verifica a rota "/favorite-recipes"', () => {
    const component = renderWithRouter(<App />, '/favorite-recipes');
    const historyTeste = component.history;
    const iconElementFavoriteRecipes = screen.getByTestId(testIDProfile);
    const titleFavoriteRecipes = screen.getByTestId(testIDTitle);
    const searchElementFavoriteRecipes = screen.queryByTestId(testIDSearch);

    expect(iconElementFavoriteRecipes).toBeInTheDocument();
    expect(titleFavoriteRecipes).toBeInTheDocument();
    expect(searchElementFavoriteRecipes).not.toBeInTheDocument();
    expect(titleFavoriteRecipes).toHaveTextContent('Favorite Recipes');
    expect(historyTeste.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se botão de perfil direciona para rota corretamente', () => {
    const component = renderWithRouter(<App />, '/meals');
    const historyTeste = component.history;
    const buttonProfile = screen.getByTestId(testIDProfile);

    userEvent.click(buttonProfile);
    expect(historyTeste.location.pathname).toBe('/profile');
  });
});
