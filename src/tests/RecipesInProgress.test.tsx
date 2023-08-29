import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from './helpers/mockFetch';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a tela de receitas em progresso', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  const MEAL_PATH = '/meals/52771/in-progress';

  test('Testando se a tela de receitas em progresso é renderizada', async () => {
    renderWithRouter(<App />, { initialEntries: [MEAL_PATH] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeTitle = await screen.findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe('Spicy Arrabiata Penne');

    const recipeImg = await screen.findByTestId('recipe-photo');

    expect(recipeImg).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');

    expect(recipeInstructions).toBeInTheDocument();

    const checkboxText = await screen.findByTestId('0-ingredient-step');
    const checkBox = await screen.findByRole('checkbox', {
      name: /penne rigate/i,
    });

    expect(checkboxText).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();

    await userEvent.click(checkBox);

    expect(checkBox).toBeChecked();
    expect(checkboxText.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');

    await userEvent.click(checkBox);

    expect(checkBox).not.toBeChecked();
    expect(checkboxText.style.textDecoration).toBe('none');
  });

  test('Testando se ao clicar no botão de compartilhar, o link da receita é copiado', async () => {
    renderWithRouter(<App />, { initialEntries: [MEAL_PATH] });

    const user = userEvent.setup();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    await user.click(shareBtn);

    const link = await screen.findByText('Link copied!');

    expect(link).toBeInTheDocument();
  });

  test('Testa se o botão de favoritar funciona', async () => {
    renderWithRouter(<App />, { initialEntries: [MEAL_PATH] });

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  });

  test('Testa se o botão de finalizar receita funciona', async () => {
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter(<App />, { initialEntries: [MEAL_PATH] });

    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    const ingredient1 = await screen.findByRole('checkbox', {
      name: /penne rigate/i,
    });
    const ingredient2 = await screen.findByRole('checkbox', {
      name: /olive oil/i,
    });
    const ingredient3 = await screen.findByRole('checkbox', {
      name: /garlic/i,
    });
    const ingredient4 = await screen.findByRole('checkbox', {
      name: /chopped tomatoes/i,
    });
    const ingredient5 = await screen.findByRole('checkbox', {
      name: /red chile flakes/i,
    });
    const ingredient6 = await screen.findByRole('checkbox', {
      name: /italian seasoning/i,
    });
    const ingredient7 = await screen.findByRole('checkbox', {
      name: /basil/i,
    });
    const ingredient8 = await screen.findByRole('checkbox', {
      name: /Parmigiano-Reggiano/i,
    });

    await userEvent.click(ingredient1);
    await userEvent.click(ingredient2);
    await userEvent.click(ingredient3);
    await userEvent.click(ingredient4);
    await userEvent.click(ingredient5);
    await userEvent.click(ingredient6);
    await userEvent.click(ingredient7);
    await userEvent.click(ingredient8);

    expect(finishRecipeBtn).not.toBeDisabled();

    await userEvent.click(finishRecipeBtn);

    expect(mockStorage).toHaveBeenCalledTimes(12);

    const doneRecipesTitle = await screen.findByTestId('page-title');

    expect(doneRecipesTitle).toBeInTheDocument();
    expect(doneRecipesTitle.innerHTML).toBe('Done Recipes');
  });
});

describe('Testando a tela de bebidas em progresso', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  const DRINK_PATH = '/drinks/178319/in-progress';

  test('Testando se a tela de bebidas em progresso é renderizada', async () => {
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter(<App />, { initialEntries: [DRINK_PATH] });

    expect(mockStorage).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeTitle = await screen.findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe('Aquamarine');

    const recipeImg = await screen.findByTestId('recipe-photo');

    expect(recipeImg).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');

    expect(recipeInstructions).toBeInTheDocument();

    const checkboxText = await screen.findByTestId('0-ingredient-step');
    const checkBox = await screen.findByRole('checkbox', {
      name: /Hpnotiq/i,
    });

    expect(checkboxText).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();

    await userEvent.click(checkBox);

    expect(mockStorage).toHaveBeenCalledTimes(2);
    expect(checkBox).toBeChecked();
    expect(checkboxText.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');

    await userEvent.click(checkBox);

    expect(checkBox).not.toBeChecked();
    expect(checkboxText.style.textDecoration).toBe('none');
  });

  test('Testando se ao clicar no botão de compartilhar, o link da receita é copiado', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINK_PATH] });

    const user = userEvent.setup();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    await user.click(shareBtn);

    const link = await screen.findByText('Link copied!');

    expect(link).toBeInTheDocument();
  });

  test('Testa se o botão de favoritar funciona', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINK_PATH] });

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  });

  test('Testa se o botão de finalizar receita funciona', async () => {
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter(<App />, { initialEntries: [DRINK_PATH] });

    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    const ingredient1 = await screen.findByRole('checkbox', {
      name: /Hpnotiq/i,
    });
    const ingredient2 = await screen.findByRole('checkbox', {
      name: /Pineapple Juice/i,
    });
    const ingredient3 = await screen.findByRole('checkbox', {
      name: /Banana Liqueur/i,
    });

    await userEvent.click(ingredient1);
    await userEvent.click(ingredient2);
    await userEvent.click(ingredient3);

    expect(finishRecipeBtn).not.toBeDisabled();

    await userEvent.click(finishRecipeBtn);

    expect(mockStorage).toHaveBeenCalledTimes(7);

    const doneRecipesTitle = await screen.findByTestId('page-title');

    expect(doneRecipesTitle).toBeInTheDocument();
    expect(doneRecipesTitle.innerHTML).toBe('Done Recipes');
  });
});
