import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/RenderWithRouter';

describe('Testando componente Header', () => {
  const TITLE_TEST_ID = 'page-title';

  test('Testando o header em /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });
    const profileBtn = screen.getByRole('button', {
      name: /profile icon/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    await userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox');

    expect(searchBar).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByTestId(TITLE_TEST_ID);

    expect(profileTitle.innerHTML).toBe('Profile');
    expect(searchBtn).not.toBeInTheDocument();
  });
  test('Testando o header em /done-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const title = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    const profileBtn = screen.getByRole('button', {
      name: /profile icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByTestId(TITLE_TEST_ID);

    expect(profileTitle.innerHTML).toBe('Profile');
  });
  test('Testando o header em /favorite-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    const title = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    const profileBtn = screen.getByRole('button', {
      name: /profile icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByTestId(TITLE_TEST_ID);

    expect(profileTitle.innerHTML).toBe('Profile');
  });
  test('Testando o header em /drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const banner = screen.getByRole('banner');

    const title = within(banner).getByRole('heading', {
      name: /drinks/i,
    });
    const profileBtn = screen.getByRole('button', {
      name: /profile icon/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    await userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox');

    expect(searchBar).toBeInTheDocument();

    await userEvent.click(profileBtn);

    const profileTitle = screen.getByTestId(TITLE_TEST_ID);

    expect(profileTitle.innerHTML).toBe('Profile');
    expect(searchBtn).not.toBeInTheDocument();
  });
  test('Testando o header em profile', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const title = screen.getByTestId(TITLE_TEST_ID);

    expect(title.innerHTML).toBe('Profile');

    const profileBtn = screen.getByRole('button', {
      name: /profile icon/i,
    });

    expect(profileBtn).toBeInTheDocument();

    await userEvent.click(profileBtn);

    expect(title.innerHTML).toBe('Profile');
  });
});
