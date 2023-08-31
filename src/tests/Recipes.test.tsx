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

    await userEvent.click(beefBtn);

    const beefRecipe = await screen.findByText(/beef and mustard pie/i);

    expect(beefRecipe).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(3);

    const allBtn = await screen.findByTestId('All-category-filter');

    userEvent.click(allBtn);

    const corbaRecipe = await screen.findByText(/corba/i);

    expect(corbaRecipe).toBeInTheDocument();
  });
});

describe('Testa componente Recipes em Drinks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  test('Verifica se ao clicar no botão cocktail, apenas os cocktails são exibidos', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(global.fetch).toBeCalledTimes(2);

    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    const milkBtn = await screen.findByTestId('Shake-category-filter');
    const allBtn = await screen.findByRole('button', { name: /All/i });
    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');
    const unknownBtn = await screen.findByTestId('Other / Unknown-category-filter');

    expect(cocktailBtn).toBeInTheDocument();
    expect(ordinaryBtn).toBeInTheDocument();
    expect(milkBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
    expect(unknownBtn).toBeInTheDocument();

    await userEvent.click(cocktailBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const cocktailRecipe = await screen.findByText(/155 Belmont/i);

    expect(cocktailRecipe).toBeInTheDocument();
  });

  test('Testa se ao clicar em All todas as receitas são exibidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(global.fetch).toBeCalledTimes(2);

    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const allBtn = await screen.findByRole('button', { name: /All/i });

    await userEvent.click(cocktailBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const cocktailRecipe = await screen.findByText(/155 Belmont/i);

    expect(cocktailRecipe).toBeInTheDocument();

    await userEvent.click(allBtn);

    const ggDrink = screen.getByText(/a piece of ass/i);

    expect(ggDrink).toBeInTheDocument();
  });
});
