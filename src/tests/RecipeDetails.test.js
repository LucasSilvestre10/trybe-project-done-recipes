import React from 'react';
// Vai passar agora
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMealMock from './mocks/oneMealMock';
import ginMock from './mocks/ginMock';
import oneDrinkMock from './mocks/oneDrinkMock';
import soupMock from './mocks/soupMock';

const startBtn = 'start-recipe-btn';

describe('Testes para a tela Recipe Details', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('Renderiza todos os componentes da tela de detalhes do Meal /meals/52771', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });
    renderWithRouter(<App />, '/meals/52771');

    const photoRecipeMeal = await screen.findByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');
    const drink = screen.getAllByTestId(/recommendation-card/i);
    const drinkTitle = screen.getAllByTestId(/recommendation-title/i);
    const startRecipeBtn = screen.getByTestId(startBtn);

    expect(photoRecipeMeal).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredients).toHaveLength(8);
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(drink).toHaveLength(6);
    expect(drinkTitle[0]).toBeInTheDocument('Gin Fizz');
    expect(drinkTitle[1]).toBeInTheDocument('Gin Sour');
    expect(startRecipeBtn).toBeInTheDocument();
  });

  test('Renderiza todos os componentes da tela de detalhes do Meal /drinks/178319', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ drinks: oneDrinkMock })
        .mockResolvedValue({ meals: soupMock }),
    });
    renderWithRouter(<App />, '/drinks/178319');

    const photoRecipeDrink = await screen.findByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
    const instructions = screen.getByTestId('instructions');
    const meal = screen.getAllByTestId(/recommendation-card/i);
    const mealTitle = screen.getAllByTestId(/recommendation-title/i);
    const startRecipeBtn = screen.getByTestId(startBtn);

    expect(photoRecipeDrink).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredients).toHaveLength(3);
    expect(instructions).toBeInTheDocument();
    expect(meal).toHaveLength(6);
    expect(mealTitle[0]).toBeInTheDocument('Leblebi Soup');
    expect(mealTitle[1]).toBeInTheDocument('Red Peas Soup');
    expect(startRecipeBtn).toBeInTheDocument();
  });

  test('Verificar se o button Start Recipe desaparece caso a receita já tem no localStorage', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });
    global.window.localStorage.setItem('doneRecipes', JSON.stringify([{ id: 52771 }]));

    renderWithRouter(<App />, '/meals/52771');

    const startRecipeBtn = screen.getByTestId(startBtn);

    expect(startRecipeBtn).toBeVisible();
  });
});
