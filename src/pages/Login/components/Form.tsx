import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LoginFormType } from '../../../types';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Form() {
  const [login, setLogin] = useState(INITIAL_STATE as LoginFormType);
  const { updateValue } = useLocalStorage('user', JSON.stringify(login));
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/meals');
    const newObject = { email: login.email };
    updateValue(JSON.stringify(newObject));
  };

  const isDisabled = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(login.email);

    const passwordRegex = /[0-9a-zA-Z]{7,}/;
    const isValidPassword = passwordRegex.test(login.password);

    return !(isValidEmail && isValidPassword);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        name="email"
        value={ login.email }
        data-testid="email-input"
        type="email"
        placeholder="Username"
        onChange={ handleChange }
      />
      <input
        name="password"
        value={ login.password }
        data-testid="password-input"
        type="password"
        placeholder="Password"
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ isDisabled() }
      >
        Enter
      </button>
    </form>
  );
}

export default Form;
