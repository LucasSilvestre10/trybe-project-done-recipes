import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import soupMock from './mocks/soupMock';
import ginMock from './mocks/ginMock';

const testIDSearch = 'search-top-btn';
const testIDSearchInput = 'search-input';
const testIDSearchBtn = 'exec-search-btn';
const testIDFirstLetter = 'first-letter-search-radio';
const testIDNameSearch = 'name-search-radio';

describe('Verificar SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search do ingrediente chicken', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'chicken');
    const radioSearch = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search do name soup', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'soup');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search da first letter "a"', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'a');
    const radioSearch = screen.getByTestId(testIDFirstLetter);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  test('Verificar se o alert é feito depois de selecionar os campos e fazer o search da first letter "aa"', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'aa');
    const radioSearch = screen.getByTestId(testIDFirstLetter);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search do ingrediente lemon', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'lemon');
    const radioSearch = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
  });

  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search do name soup', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'gin');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  test('Verificar se o fetch é feito depois de selecionar os campos e fazer o search da first letter "a"', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'a');
    const radioSearch = screen.getByTestId(testIDFirstLetter);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  test('Verificar se o alert é feito depois de selecionar os campos e fazer o search da first letter "aa"', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'aa');
    const radioSearch = screen.getByTestId(testIDFirstLetter);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Verificar se o alert é feito mostrando que não há receitas para xablau', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'xablau');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalled();
    await new Promise((res) => { setTimeout(res, 100); });
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });

  test('Verificar se há roteamento para a página de detalhes caso apenas um meal é descoberto', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [{ idMeal: 52771 }] }),
    });
    const { history } = renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'Arrabiata');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    await new Promise((res) => { setTimeout(res, 100); });
    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('Verificar se há roteamento para a página de detalhes caso apenas um drink é descoberto', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [{ idDrink: 178319 }] }),
    });
    const { history } = renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'Aquamarine');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    await new Promise((res) => { setTimeout(res, 100); });
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('Verificar se é renderizado as receitas envolvendo nome soup', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: soupMock }),
    });
    renderWithRouter(<App />, '/meals');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'soup');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    await new Promise((res) => { setTimeout(res, 100); });
    const primeiraSoup = screen.getByTestId('0-recipe-card');
    expect(primeiraSoup).toBeInTheDocument();
  });

  test('Verificar se é renderizado as receitas envolvendo nome gin', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: ginMock }),
    });
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);
    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'gin');
    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);
    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
    await new Promise((res) => { setTimeout(res, 100); });
    const primeiroGin = screen.getByTestId('0-recipe-card');
    expect(primeiroGin).toBeInTheDocument();
  });
});
