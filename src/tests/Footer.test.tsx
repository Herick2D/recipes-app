import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('Testando componente Footer', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  test('Testando o redirecionamento do botão do Footer de /meals para /drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const title = await screen.findByRole('heading', { name: /meals/i });

    expect(title).toBeInTheDocument();

    const button = await screen.findByRole('img', { name: /drink/i });

    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { name: 'Drinks' });

    expect(newTitle).toBeInTheDocument();
  });

  test('Testando o redirecionamento do botão do Footer de /drinks para /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const title = await screen.findByRole('heading', { name: 'Drinks' });

    expect(title).toBeInTheDocument();

    const button = screen.getByRole('img', {
      name: /food-button/i,
    });

    userEvent.click(button);

    const newTitle = await screen.findByRole('heading', { name: 'Meals' });

    expect(newTitle).toBeInTheDocument();
  });
});
