import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const emailTest = 'grupo6@trybe.com';
let inputEmail = '';
let inputPassword = '';
let buttonLogin = '';

describe('Testes para Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    inputEmail = screen.getByTestId('email-input');
    inputPassword = screen.getByTestId('password-input');
    buttonLogin = screen.getByTestId('login-submit-btn');
  });

  test('Verificar os elementos da página de Login', () => {
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Preenchimento dos campos de Login', () => {
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '6');

    expect(inputEmail).toHaveValue(emailTest);
    expect(inputPassword).toHaveValue('6');
  });

  test('Validação do button', () => {
    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '123456789');

    expect(buttonLogin).not.toBeDisabled();
  });
});
