import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material';
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
    <Stack component="form" spacing={ 2 } onSubmit={ handleSubmit }>
      <TextField
        name="email"
        variant="outlined"
        value={ login.email }
        type="email"
        label="Email"
        onChange={ handleChange }
        size="small"
        autoComplete="off"
        inputProps={ { 'data-testid': 'email-input' } }
      />
      <TextField
        name="password"
        variant="outlined"
        value={ login.password }
        type="password"
        label="Senha"
        onChange={ handleChange }
        size="small"
        inputProps={ { 'data-testid': 'password-input' } }
      />
      <Button
        data-testid="login-submit-btn"
        type="submit"
        color="primary"
        variant="contained"
        disabled={ isDisabled() }
      >
        Enter
      </Button>
    </Stack>
  );
}

export default Form;
