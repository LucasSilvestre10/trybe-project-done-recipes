import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testIDSearch = 'search-top-btn';
const testIDSearchInput = 'search-input';
const testIDSearchBtn = 'exec-search-btn';
const testIDFirstLetter = 'first-letter-search-radio';

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
    const radioSearch = screen.getByTestId('name-search-radio');
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
    const radioSearch = screen.getByTestId('name-search-radio');
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
});
