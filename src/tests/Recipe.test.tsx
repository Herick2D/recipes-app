import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
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

  test('Testando se a página contém as informações da receita', async () => {
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });
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
});
