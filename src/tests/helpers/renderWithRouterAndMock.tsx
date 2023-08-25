import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { DrinksCategoryMock, MealsCategoryMock } from './categoriesMock';
import chickenMealsMock from './chickenMealsMock';

export const renderWithRouterAndMock = (
  children: React.ReactNode,
  mockFetch: Mock<any, any>,
  roteInitial = '/',
) => {
  global.fetch = mockFetch;
  return {
    screen,
    user: userEvent,
    ...render(
      <MemoryRouter initialEntries={ [roteInitial] }>
        {children}
      </MemoryRouter>,
    ),
  };
};

export const mockDrinksCategories = vi.fn().mockResolvedValue({
  json: async () => (DrinksCategoryMock),
});

export const mockMealsCategories = vi.fn().mockResolvedValue({
  json: async () => (MealsCategoryMock),
});

export const mockMeals = vi.fn().mockResolvedValue({
  json: async () => (chickenMealsMock),
});
