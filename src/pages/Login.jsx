import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/Login.css';

function Login() {
  const MIN_LOGIN = 6;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { setLocalStorage } = useLocalStorage();

  const history = useHistory();

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
  const handleSubmit = () => {
    setLocalStorage('user', { email: login.email });
    history.push('/meals');
  };

  return (
    <div className="login-container ">
      <section className="form-login">
        LOGIN
        <input
          className="form-login input"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ login.email }
          onChange={ handleChange }
          placeholder="Email"
        />

        <input
          className="form-login input"
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ login.password }
          onChange={ handleChange }
          placeholder="Password"
        />

        <button
          className="buttonLogin"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validateButton() }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </section>
    </div>
  );
}

export default Login;
