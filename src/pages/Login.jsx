import React, { useState } from 'react';

function Login() {
  const MIN_LOGIN = 6;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const validateButton = () => {
    const { email, password } = login;
    const validaPassword = password.length > MIN_LOGIN;
    const validateEmail = email.match(/\S+@\S+\.\S+/);
    let result = true;
    if (validaPassword && validateEmail) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <div>

      <input
        type="email"
        name="email"
        id="email"
        data-testid="email-input"
        value={ login.email }
        onChange={ handleChange }
      />

      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
        value={ login.password }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validateButton() }
      >
        Enter
      </button>

    </div>
  );
}

export default Login;
