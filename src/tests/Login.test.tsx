import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe(('Testando a página de Login'), () => {
  test('Testando o formulário da página de Login', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await userEvent.type(emailInput, 'email@mail.com');
    await userEvent.type(passwordInput, '1234567');

    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(screen.getByText('Meals')).toBeInTheDocument();
  });
});
