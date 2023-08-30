import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FavoriteRecipes from '../components/Layout/components/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify([
    {
      id: '52977',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: 'Brazil',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Caipirinha',
      image: 'https://www.thecocktaildb.com/images/media/drink/vwxrsw1478251483.jpg',
    },
  ]));

  test('Verificando se os elementos estão sendo renderizandos em tela', () => {
    renderWithRouter(<FavoriteRecipes />);
    const mealImg = screen.getByRole('img', { name: /Spicy Arrabiata Penne/i });
    const drinkImg = screen.getByRole('img', { name: /Caipirinha/i });
    const mealCategory = screen.getByText(/Italian - Vegetarian/i);
    const drinkCategory = screen.getByText(/Alcoholic/i);
    const mealName = screen.getByText(/Spicy Arrabiata Penne/i);
    const drinkName = screen.getByText(/Caipirinha/i);

    expect(mealName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(mealCategory).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });

  test('Verificando comportamento dos filtros', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeal = screen.getByTestId('filter-by-meal-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(btnMeal);
    expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
    expect(screen.queryByText(/Caipirinha/i)).not.toBeInTheDocument();

    await userEvent.click(btnDrink);
    expect(screen.getByText(/Caipirinha/i)).toBeInTheDocument();
    expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();

    await userEvent.click(btnAll);
    expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
    expect(screen.getByText(/Caipirinha/i)).toBeInTheDocument();
  });

  test('Verificando se a receita é removida da tela ao clicar no botão de favoritar', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const favBtnMeal = screen.getByTestId('0-horizontal-favorite-btn');
    const favBtnDrink = screen.getByTestId('1-horizontal-favorite-btn');

    await userEvent.click(favBtnMeal);
    expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();

    await userEvent.click(favBtnDrink);
    expect(screen.queryByText(/Caipirinha/i)).not.toBeInTheDocument();
  });

  test('Verificando se o botão de compartilhar funciona', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52977',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: 'Brazil',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Caipirinha',
        image: 'https://www.thecocktaildb.com/images/media/drink/vwxrsw1478251483.jpg',
      },
    ]));
    // @ts-expect-error Property 'clipboard' does not exist on type 'Navigator'.
    global.navigator.clipboard = {
      writeText: vi.fn(),
      readText: () => 'http://localhost/meals/52977',
    };
    renderWithRouter(<FavoriteRecipes />);
    const shareBtnMeal = screen.getByTestId('0-horizontal-share-btn');

    await userEvent.click(shareBtnMeal);
    expect(screen.getAllByText(/Link copied!/i)[0]).toBeInTheDocument();
    expect(navigator.clipboard.readText()).toBe('http://localhost/meals/52977');
  });
});
