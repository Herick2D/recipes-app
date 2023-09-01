import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { doneRecipes } from './helpers/doneRecipesMock';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('Testando a página Done Recipes', () => {
  beforeAll(() => {
    global.Storage.prototype.getItem = vi.fn(() => JSON.stringify(doneRecipes));
  });

  const RECIPE_TEST_ID_0 = '0-horizontal-name';
  const RECIPE_TEST_ID_1 = '1-horizontal-name';
  const PATH = ['/done-recipes'];

  test('Teste se a página renderiza corretamente', () => {
    renderWithRouter(<App />, { initialEntries: PATH });

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    const recipe1Title = screen.getByTestId(RECIPE_TEST_ID_0);
    const recipe2Title = screen.getByTestId(RECIPE_TEST_ID_1);

    expect(recipe1Title).toBeInTheDocument();
    expect(recipe2Title).toBeInTheDocument();
  });

  test('Testando se ao clicar no botão de copiar o link, o link da receita é copiado', async () => {
    renderWithRouter(<App />, { initialEntries: PATH });

    const recipe1ShareBtn = screen.getByTestId('0-horizontal-share-btn');

    expect(recipe1ShareBtn).toBeInTheDocument();

    await userEvent.click(recipe1ShareBtn);

    const recipe1Link = screen.getByTestId('0-horizontal-share-btn');

    expect(recipe1Link).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Meals, apenas as receitas de comida são exibidas', async () => {
    renderWithRouter(<App />, { initialEntries: PATH });

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const firstMeal = screen.getByTestId(RECIPE_TEST_ID_0);
    const secondMeal = screen.getByTestId(RECIPE_TEST_ID_1);

    expect(mealButton).toBeInTheDocument();
    expect(firstMeal).toBeInTheDocument();
    expect(secondMeal).toBeInTheDocument();

    await userEvent.click(mealButton);

    expect(firstMeal).toBeInTheDocument();
    expect(firstMeal).toHaveTextContent('Spicy Arrabiata Penne');
    expect(secondMeal).not.toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Drinks, apenas as receitas de bebida são exibidas e se ao clicar no botão all todas são exibidas', async () => {
    renderWithRouter(<App />, { initialEntries: PATH });

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    const firstRecipe = screen.getByTestId(RECIPE_TEST_ID_0);
    const secondRecipe = screen.getByTestId(RECIPE_TEST_ID_1);

    expect(drinkButton).toBeInTheDocument();
    expect(firstRecipe).toBeInTheDocument();
    expect(secondRecipe).toBeInTheDocument();

    await userEvent.click(drinkButton);

    const drinkRecipe = screen.getByTestId(RECIPE_TEST_ID_0);

    expect(firstRecipe).not.toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();
    expect(drinkRecipe).toHaveTextContent('Aquamarine');

    const allBtn = screen.getByTestId('filter-by-all-btn');

    await userEvent.click(allBtn);

    expect(screen.getByTestId(RECIPE_TEST_ID_0)).toBeInTheDocument();
    expect(secondRecipe).toBeInTheDocument();
  });

  test('Testa se ao clicar na receita é redirecionado para a página de detalhes da receita', async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);

    renderWithRouter(<App />, { initialEntries: PATH });

    const firstRecipe = screen.getByTestId(RECIPE_TEST_ID_0);

    expect(firstRecipe).toBeInTheDocument();

    await userEvent.click(firstRecipe);

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');

    expect(ingredient).toBeInTheDocument();
  });
});
