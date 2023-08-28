import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import beefMeals from './helpers/beefMealsMock';
import { MealsCategoryMock } from './helpers/categoriesMock';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

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

  test('Verifica se ao clicar no botão Beef, apenas receitas de Beef são exibidas', async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(global.fetch).toBeCalledTimes(2);

    const beefBtn = await screen.findByTestId('Beef-category-filter');

    userEvent.click(beefBtn);

    const beefRecipe = await screen.findByText(/beef and mustard pie/i);

    expect(beefRecipe).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(3);

    const allBtn = await screen.findByTestId('All-category-filter');

    userEvent.click(allBtn);

    const corbaRecipe = await screen.findByText(/corba/i);

    expect(corbaRecipe).toBeInTheDocument();
  });
});
