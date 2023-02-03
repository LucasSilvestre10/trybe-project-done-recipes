import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('testa component DoneRecipes na rota /done-recipes', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  afterEach(() => jest.clearAllMocks());

  test('testa se é renderizado corretamente', () => {
    renderWithRouter(<App />, '/done-recipes');
    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    expect(buttonShare).toBeDefined();
  });
});
