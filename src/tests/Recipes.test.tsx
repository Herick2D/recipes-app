import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa componente Recipes em Meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se os alimentos da categoria chicken', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(async () => {
      const buttonChicken = screen.getByRole('button', { name: /chicken/i });
      expect(buttonChicken).toBeInTheDocument();
      userEvent.click(buttonChicken);

      const firstRecipes = screen.findByText(/ayam percik/i);
      expect(firstRecipes);
    }, { timeout: 4000 });
  });

  test('Testa o botão All', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(async () => {
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
    }, { timeout: 3000 });
  });
});
