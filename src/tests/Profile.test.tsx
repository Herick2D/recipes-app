import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando a página Profile', () => {
  const testeEmail = 'teste@gmail.com';
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.Storage.prototype.getItem = vi.fn(() => JSON.stringify({
      email: testeEmail,
    }));
  });
  test('Testando se o email é renderizado na tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const email = await screen.findByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(testeEmail);

    const doneButton = await screen.findByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    const logoutButton = await screen.findByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);

    expect(email).not.toBeInTheDocument();
    expect(doneButton).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  test('Testando se os botões de redirecionamento estão funcionando', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const doneButton = await screen.findByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();

    await userEvent.click(doneButton);
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  test('Testando se os botões de redirecionamento estão funcionando', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const favoriteButton = await screen.findByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
});
