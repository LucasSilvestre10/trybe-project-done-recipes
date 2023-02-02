import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMealMock from './mocks/oneMealMock';
import ginMock from './mocks/ginMock';
import oneDrinkMock from './mocks/oneDrinkMock';
import soupMock from './mocks/soupMock';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const startBtn = 'start-recipe-btn';
const favoriteButton = 'favorite-btn';
const mealsID = '/meals/52771';
const drinksID = '/drinks/178319';
// const localStorageSimulator = require('./mocks/localStorageSimulator');

// localStorageSimulator('getItem');
// localStorageSimulator('setItem');

describe('Testes para a tela Recipe Details', () => {
  // class LocalStorageMock {
  //   constructor() {
  //     this.store = {};
  //   }

  //   getItem(key) {
  //     return this.store[key] || null;
  //   }

  //   setItem(key, value) {
  //     this.store[key] = String(value);
  //   }

  //   clear() {
  //     this.store = {};
  //   }
  // }
  // Object.defineProperty(window, 'localStorage', { value: LocalStorageMock });
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
    renderWithRouter(<App />, mealsID);

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
    renderWithRouter(<App />, drinksID);

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
    global.window.localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52771' }]));

    renderWithRouter(<App />, mealsID);

    const startRecipeBtn = screen.queryByTestId(startBtn);

    expect(startRecipeBtn).not.toBeInTheDocument();
  });

  test('Verificar se o button Start Recipe muda de texto para Continue Recipe caso a receita meal esteja em progresso', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });
    global.window.localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52771: [] } }));

    renderWithRouter(<App />, mealsID);

    const startRecipeBtn = screen.queryByTestId(startBtn);

    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  test('Verificar se o button Start Recipe muda de texto para Continue Recipe caso a receita drink esteja em progresso', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ drinks: oneDrinkMock })
        .mockResolvedValue({ meals: soupMock }),
    });
    global.window.localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 178319: [] }, meals: { } }));

    renderWithRouter(<App />, drinksID);

    const startRecipeBtn = screen.queryByTestId(startBtn);

    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  test('Verificar se o button Start Recipe redireciona para a tela de receita em progresso', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });

    const { history } = renderWithRouter(<App />, mealsID);
    const startRecipeBtn = screen.queryByTestId(startBtn);

    userEvent.click(startRecipeBtn);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  test('Verificar se os buttons de favoritar e compartilhar existem', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });
    renderWithRouter(<App />, mealsID);

    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId(favoriteButton);

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });

  test('Verificar se o HTML Link Copied aparece quando clica no button de compartilhar', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, mealsID);

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);

    const shareMessage = screen.getByText(/Link copied!/i);
    expect(shareMessage).toBeInTheDocument();
  });

  // test('Verificar se a receita é salva no localStorage como favorite recipes quando clica no button de favoritar', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
  //       .mockResolvedValue({ drinks: ginMock }),
  //   });
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52771' }]));
  //   renderWithRouter(<App />, '/meals/52771');

  //   const favoriteBtn = screen.getByTestId('favorite-btn');
  //   expect(favoriteBtn).toBeInTheDocument();
  //   expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
  //   // expect(getStorageArray).toHaveLength(1);
  // });

  test('Verifica se o botão favorito no meal depois de clicado vai de whiteHeartIcon para blackHeartIcon', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
        .mockResolvedValue({ drinks: ginMock }),
    });
    renderWithRouter(<App />, mealsID);
    const favoriteBtn = screen.getByTestId(favoriteButton);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  // test('Verifica se o botão favorito no drink depois de clicado vai de whiteHeartIcon para blackHeartIcon', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce({ drinks: oneDrinkMock })
  //       .mockResolvedValue({ meals: soupMock }),
  //   });
  //   renderWithRouter(<App />, drinksID);
  //   const favoriteBtn = screen.getByTestId(favoriteButton);
  //   expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  //   window.localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '9999' }]));
  //   const storage = window.localStorage.getItem('favoriteRecipes');
  //   const storageTratado = JSON.parse(storage);
  //   expect(storageTratado).toEqual([{ id: '9999' }]);
  //   userEvent.click(favoriteBtn);
  //   expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
  //   const storageNovo = window.localStorage.getItem('favoriteRecipes');
  //   const storageNovoTratado = JSON.parse(storageNovo);
  //   expect(storageNovoTratado).toBe(null);
  //   userEvent.click(favoriteBtn);
  //   expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  //   // const testetest = screen.getByTestId('testeteste');
  //   // expect(testetest).toBeInTheDocument();
  // });

  // test('Verifica se o botão favorito possui o blackHeartIcon com localStorage', () => {
  //   const answer = JSON.stringify([{ id: 52774 }]);
  //   localStorage.setItem('favoriteRecipes', answer);
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce({ meals: oneMealMock })
  //       .mockResolvedValue({ drinks: ginMock }),
  //   });
  //   // global.window.localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: 52771 }]));
  //   renderWithRouter(<App />, '/meals/52771');
  //   const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   expect(storage).toHaveLength(1);
  //   const favoriteBtn = screen.getByTestId('favorite-btn');
  // });
});
