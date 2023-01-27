import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testIDFooter = 'footer';
const testIDDrinks = 'drinks-bottom-btn';
const testIDMeals = 'meals-bottom-btn';

describe('Testes para o Footer', () => {
  test('Se na rota "/meals" possui um Footer', () => {
    const component = renderWithRouter(<App />, '/meals');
    const historyTeste = component.history;
    const iconDrinks = screen.getByTestId(testIDDrinks);
    const iconMeals = screen.getByTestId(testIDMeals);
    const footer = screen.getByTestId(testIDFooter);

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(historyTeste.location.pathname).toBe('/meals');
  });

  test('Se na rota "/drinks" possui o Footer', () => {
    const component = renderWithRouter(<App />, '/drinks');
    const historyTeste = component.history;
    const iconDrinks = screen.getByTestId(testIDDrinks);
    const iconMeals = screen.getByTestId(testIDMeals);
    const footer = screen.getByTestId(testIDFooter);

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(historyTeste.location.pathname).toBe('/drinks');
  });

  test('Se a rota "/profile" possui o Footer', () => {
    const component = renderWithRouter(<App />, '/profile');
    const historyTeste = component.history;
    const iconDrinks = screen.getByTestId(testIDDrinks);
    const iconMeals = screen.getByTestId(testIDMeals);
    const footer = screen.getByTestId(testIDFooter);

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(historyTeste.location.pathname).toBe('/profile');
  });

  test('Se a rota "/done-recipes" possui o Footer', () => {
    const component = renderWithRouter(<App />, '/done-recipes');
    const historyTeste = component.history;
    const iconDrinks = screen.getByTestId(testIDDrinks);
    const iconMeals = screen.getByTestId(testIDMeals);
    const footer = screen.getByTestId(testIDFooter);

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(historyTeste.location.pathname).toBe('/done-recipes');
  });

  test('Se a rota "/favorite-recipes" possui o Footer', () => {
    const component = renderWithRouter(<App />, '/favorite-recipes');
    const historyTeste = component.history;
    const iconDrinks = screen.getByTestId(testIDDrinks);
    const iconMeals = screen.getByTestId(testIDMeals);
    const footer = screen.getByTestId(testIDFooter);

    expect(iconDrinks).toBeInTheDocument();
    expect(iconMeals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(historyTeste.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se botão de Meals direciona para rota corretamente', () => {
    const component = renderWithRouter(<App />, '/profile');
    const historyTeste = component.history;
    const buttonMeals = screen.getByTestId(testIDMeals);

    userEvent.click(buttonMeals);
    expect(historyTeste.location.pathname).toBe('/meals');
  });

  test('Testa se botão de Drinks direciona para rota corretamente', () => {
    const component = renderWithRouter(<App />, '/profile');
    const historyTeste = component.history;
    const buttonDrinks = screen.getByTestId(testIDDrinks);

    userEvent.click(buttonDrinks);
    expect(historyTeste.location.pathname).toBe('/drinks');
  });
});
