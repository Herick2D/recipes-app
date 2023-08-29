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
  const WHITE_HEART_SVG = 'whiteHeartIcon.svg';

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
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);

    await userEvent.click(favoriteBtn);

    expect(mockStorage).toHaveBeenCalledTimes(1);
    expect(favoriteBtn.src).toContain('blackHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(mockStorage).toHaveBeenCalledTimes(2);
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);
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

  test('Testando se ao clicar no botão de Start Recipe, o usuário é redirecionado para a tela de receita em processo', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [MEAL_PAGE] });
    });

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    await userEvent.click(startRecipeBtn);

    const ingredient = await screen.findByRole('checkbox', {
      name: /penne rigate/i,
    });

    expect(ingredient).toBeInTheDocument();
  });
});

describe('Testando a pagina Recipe em /drinks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  const WHITE_HEART_SVG = 'whiteHeartIcon.svg';
  const DRINK_URL = '/drinks/178319';

  test('Testando se renderiza a pagina', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [DRINK_URL] });
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const drinkTitle = await screen.findByTestId('recipe-title');

    expect(drinkTitle).toBeInTheDocument();
    expect(drinkTitle.innerHTML).toBe('Aquamarine');
  });

  test('Testando se ao clicar no botão de favoritar, a receita é adicionada aos favoritos', async () => {
    const mockStorage = vi.spyOn(Storage.prototype, 'setItem');

    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [DRINK_URL] });
    });

    const favoriteBtn = await screen.findByTestId('favorite-btn') as HTMLImageElement;
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);

    await userEvent.click(favoriteBtn);

    expect(mockStorage).toHaveBeenCalledTimes(1);
    expect(favoriteBtn.src).toContain('blackHeartIcon.svg');

    await userEvent.click(favoriteBtn);

    expect(mockStorage).toHaveBeenCalledTimes(2);
    expect(favoriteBtn.src).toContain(WHITE_HEART_SVG);
  });

  test('Testa se ao clicar no botão Start Recipe, o usuário é redirecionado para a tela de receita em processo', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [DRINK_URL] });
    });

    const startRecipeBtn = await screen.findByRole('button', {
      name: /start recipe/i,
    });
    expect(startRecipeBtn).toBeInTheDocument();

    await userEvent.click(startRecipeBtn);

    const ingredient = await screen.findByRole('checkbox', {
      name: /hpnotiq/i,
    });

    expect(ingredient).toBeInTheDocument();
  });
});
