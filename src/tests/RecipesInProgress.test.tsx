import { vi } from 'vitest';
import { screen } from '@testing-library/react';
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
});
