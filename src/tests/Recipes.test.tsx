import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import beefMeals from './helpers/beefMealsMock';
import { MealsCategoryMock } from './helpers/categoriesMock';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa componente Recipes em Meals', () => {
  test('Verifica os botões de categorias em /Meals', async () => {
    global.fetch = vi.fn()
      .mockResolvedValue({
        json: async () => (beefMeals),
      })
      .mockResolvedValueOnce({
        json: async () => (MealsCategoryMock),
      });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    const breakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const dessertBtn = await screen.findByTestId('Dessert-category-filter');
    const goatBtn = await screen.findByTestId('Goat-category-filter');
    const allBtn = await screen.findByTestId('All-category-filter');

    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });
});
