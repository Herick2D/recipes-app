import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../pages/Login';
import { renderWithRouter } from './helpers/RenderWithRouter';

test('Testando o formulário da página de Login', async () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();

  await userEvent.type(emailInput, 'teste@gmail.com');
  await userEvent.type(passwordInput, 'teste12345');

  expect(submitButton).toBeEnabled();

  await userEvent.click(submitButton);
});
