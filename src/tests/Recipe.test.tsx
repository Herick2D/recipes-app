import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from './helpers/mockFetch';
import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';

describe('Testando a página Recipe', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  const MEAL_PAGE = '/meals/52771';

  test('Testando se a página contém as informações da receita', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [MEAL_PAGE] });
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const mealTitle = await screen.findByTestId('recipe-title');
    const mealCategory = await screen.findByTestId('recipe-category');
    const mealImg = await screen.findByTestId('recipe-photo');
    const mealVideo = await screen.findByTestId('video');
    const mealCarousel = await screen.findByTestId('0-recommendation-card');
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    expect(mealTitle).toBeInTheDocument();
    expect(mealTitle.innerHTML).toBe('Spicy Arrabiata Penne');
    expect(mealCategory).toBeInTheDocument();
    expect(mealCategory.innerHTML).toBe('Vegetarian');
    expect(mealImg).toBeInTheDocument();
    expect(mealVideo).toBeInTheDocument();
    expect(mealCarousel).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
  });

  test('Testando se ao clicar no botão de favoritar, a receita é adicionada aos favoritos', async () => {
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');

    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [MEAL_PAGE] });
    });

    const favoriteBtn = await screen.findByTestId('favorite-btn') as HTMLImageElement;
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.src).toContain('whiteHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(mockStorage).toHaveBeenCalledTimes(1);
    expect(favoriteBtn.src).toContain('blackHeartIcon.svg');
  });

  test('Testando se ao clicar no botão de compartilhar, o link da receita é copiado', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [MEAL_PAGE] });
    });

    const user = userEvent.setup();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    await user.click(shareBtn);

    const link = await screen.findByText('Link copied!');

    expect(link).toBeInTheDocument();
  });
});
