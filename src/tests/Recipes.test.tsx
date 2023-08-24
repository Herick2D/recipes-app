import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import beefMeals from './helpers/beefMealsMock';

describe('Testa componente Recipes em Meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se os alimentos da categoria Beef são renderizados ao clicar no botão Beef', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    const beefButton = await screen.findByRole('button', {
      name: /beef/i,
    });
    const breakfastButton = await screen.findByRole('button', {
      name: /breakfast/i,
    });

    const chickenButton = await screen.findByRole('button', {
      name: /chicken/i,
    });

    const dessertButton = await screen.findByRole('button', {
      name: /dessert/i,
    });

    const goatButton = await screen.findByRole('button', {
      name: /goat/i,
    });

    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();

    userEvent.click(beefButton);

    const beefMealsList = await screen.findByTestId('0-recipe-card');

    expect(beefMealsList).toHaveTextContent('Beef and Mustard Pie');
  });

  test('Verifica se os alimentos gerais são renderizados ao clicar no botão All', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    const allButton = await screen.findByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const beefMealsList = await screen.findByTestId('0-recipe-card');

    expect(beefMealsList).toHaveTextContent('Beef and Mustard Pie');
  });
});
