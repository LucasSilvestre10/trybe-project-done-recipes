import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testIDSearch = 'search-top-btn';
const testIDSearchInput = 'search-input';
const testIDSearchBtn = 'exec-search-btn';
const testIDNameSearch = 'name-search-radio';

const fetch = require('../../cypress/mocks/fetch');

describe('Verificar SearchBar', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  afterEach(() => jest.clearAllMocks());

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

  test('Verificar se o alert é feito mostrando que não há receitas para xablau', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    act(() => {
      renderWithRouter(
        <App />,
        '/meals',
      );
    });

    const searchTopBtn = screen.getByTestId(testIDSearch);
    userEvent.click(searchTopBtn);

    const inputSearch = screen.getByTestId(testIDSearchInput);
    userEvent.type(inputSearch, 'xablau');

    const radioSearch = screen.getByTestId(testIDNameSearch);
    userEvent.click(radioSearch);

    const searchButton = screen.getByTestId(testIDSearchBtn);
    userEvent.click(searchButton);
  });

  test('Verificar se há roteamento para a página de detalhes caso apenas um meal é descoberto', async () => {
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
