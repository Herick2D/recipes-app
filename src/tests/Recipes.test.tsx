import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { mockMeals, mockMealsCategories, renderWithRouterAndMock } from './helpers/renderWithRouterAndMock';

describe('Testa componente Recipes em Meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica os botões de categorias em /Meals', async () => {
    renderWithRouterAndMock(<App />, mockMealsCategories, '/meals');

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockMeals),
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
