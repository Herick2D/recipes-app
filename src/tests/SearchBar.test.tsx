import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from './helpers/beefMealsMock';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import chikenMeals from './helpers/chickenMealsMock';
import oneMealMock from './helpers/oneMealMock';
import cocktailDrinks from './helpers/cocktailDrinksMock';
import oneDrink from './helpers/oneDrinkMock';
import drinksMock from './helpers/drinksMock';
import { DrinksCategoryMock, MealsCategoryMock } from './helpers/categoriesMock';
import mockFetch from './helpers/mockFetch';

describe('Teste SearchBar em Meals', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (MealsCategoryMock),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const SEARCH_INPUT = 'search-input';
  const SUBMIT_BUTTON = 'exec-search-btn';

  test('Testa os componentes SearchBar e faz uma pesquisa de ingrediente beef', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirst).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

    await userEvent.type(searchInput, 'beef');
    await userEvent.click(radioIng);

    expect(radioIng).toBeChecked();
    expect(searchInput).toHaveValue('beef');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const meal = screen.getByText(/Beef and Mustard Pie/i);

    expect(meal).toBeInTheDocument();
  });

  test('Testa API para pesquisa pelo radio Name', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirst).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

    await userEvent.type(searchInput, 'beef');
    await userEvent.click(radioName);

    expect(radioName).toBeChecked();
    expect(searchInput).toHaveValue('beef');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const meal = screen.getByText(/Beef and Mustard Pie/i);

    expect(meal).toBeInTheDocument();
  });

  test('Testa API para 1 receita encontrada', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (oneMealMock),
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(searchBtn).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'arrabiata');
    await userEvent.click(nameRadio);

    expect(searchBar).toHaveValue('arrabiata');
  });

  test('Testa alert para 0 receitas', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: null }),
    });

    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchIcon = screen.getByRole('button', {
      name: /search icon/i,
    });

    await userEvent.click(searchIcon);

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await userEvent.click(radioName);
    await userEvent.type(searchInput, 'xablau');

    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(submitBtn);

    expect(alert).toBeCalledTimes(1);

    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });

    await userEvent.click(radioFirst);

    expect(radioFirst).toBeChecked();

    await userEvent.click(submitBtn);

    expect(alert).toBeCalledTimes(3);
  });
  test('Testa API para radio first letter', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (chikenMeals),
    });

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });

    expect(radioFirst).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(radioFirst);
    await userEvent.type(searchInput, 'a');

    expect(radioFirst).toBeChecked();
    expect(searchInput).toHaveValue('a');

    await userEvent.click(submitBtn);

    const meal = screen.getByText(/Chicken Couscous/i);

    expect(meal).toBeInTheDocument();
  });
});

describe('Teste SearchBar em Drinks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const SEARCH_INPUT = 'search-input';
  const SUBMIT_BUTTON = 'exec-search-btn';

  test('Testa os componentes SearchBar e faz uma pesquisa de cocktail', async () => {
    global.fetch = vi.fn()
      .mockResolvedValue({
        json: async () => (cocktailDrinks),
      })
      .mockResolvedValueOnce({
        json: async () => (DrinksCategoryMock),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const title = screen.getByRole('heading', {
      name: /drinks/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirst).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(searchInput, 'cocktail');
    await userEvent.click(radioIng);

    expect(radioIng).toBeChecked();
    expect(searchInput).toHaveValue('cocktail');

    await userEvent.click(submitBtn);
    expect(global.fetch).toBeCalledTimes(3);

    const drink = screen.getByText(/Absolutely Fabulous/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa API para pesquisa pelo radio Name', async () => {
    global.fetch = vi.fn()
      .mockResolvedValue({
        json: async () => (cocktailDrinks),
      })
      .mockResolvedValueOnce({
        json: async () => (DrinksCategoryMock),
      });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const title = screen.getByRole('heading', {
      name: /drinks/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioIng = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirst).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

    await userEvent.type(searchInput, 'cocktail');
    await userEvent.click(radioName);

    expect(radioName).toBeChecked();
    expect(searchInput).toHaveValue('cocktail');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const drink = screen.getByText(/Absolutly Screwed Up/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa API para 1 receita encontrada', async () => {
    global.fetch = vi.fn()
      .mockResolvedValue({
        json: async () => (drinksMock),
      })
      .mockResolvedValueOnce({
        json: async () => (DrinksCategoryMock),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (oneDrink),
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(searchBtn).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(searchBar, 'Aquamarine');
    await userEvent.click(nameRadio);

    expect(searchBar).toHaveValue('Aquamarine');
  });

  test('Testa alert para 0 receitas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: null }),
    });

    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchIcon = screen.getByRole('button', {
      name: /search icon/i,
    });

    await userEvent.click(searchIcon);

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await userEvent.click(radioName);
    await userEvent.type(searchInput, 'xablau');

    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(submitBtn);

    expect(alert).toBeCalledTimes(1);

    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });

    await userEvent.click(radioFirst);

    expect(radioFirst).toBeChecked();

    await userEvent.click(submitBtn);

    expect(alert).toBeCalledTimes(3);
  });

  test('Testa API para radio first letter', async () => {
    global.fetch = vi.fn()
      .mockResolvedValue({
        json: async () => (drinksMock),
      })
      .mockResolvedValueOnce({
        json: async () => (DrinksCategoryMock),
      });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const title = screen.getByRole('heading', {
      name: /drinks/i,
    });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
    await userEvent.click(searchBtn);

    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });

    expect(radioFirst).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(radioFirst);
    await userEvent.type(searchInput, 'a');

    expect(radioFirst).toBeChecked();
    expect(searchInput).toHaveValue('a');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(3);

    const drink = screen.getByText(/Apello/i);

    expect(drink).toBeInTheDocument();
  });
});

describe('Testando o SearchBar para 1 receita', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });

  test('Testando se ao buscar Spicy Arrabiata Penne a pagina é redirecionada para a receita', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    userEvent.click(searchBtn);

    const searchInput = await screen.findByRole('textbox');
    const submitBtn = await screen.findByRole('button', {
      name: 'Search',
    });
    const radioName = await screen.findByRole('radio', {
      name: /name/i,
    });

    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();

    await userEvent.type(searchInput, 'arrabiata');
    await userEvent.click(radioName);

    expect(searchInput).toHaveValue('arrabiata');
    expect(radioName).toBeChecked();

    await userEvent.click(submitBtn);

    const recipeTitle = await screen.findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');
  });

  test('Testando se ao buscar Aquamarine a pagina é redirecionada para a receita', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    userEvent.click(searchBtn);

    const searchInput = await screen.findByRole('textbox');
    const submitBtn = await screen.findByRole('button', {
      name: 'Search',
    });
    const radioName = await screen.findByRole('radio', {
      name: /name/i,
    });

    expect(searchInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();

    await userEvent.type(searchInput, 'aquamarine');
    await userEvent.click(radioName);

    expect(searchInput).toHaveValue('aquamarine');
    expect(radioName).toBeChecked();

    await userEvent.click(submitBtn);

    const recipeTitle = await screen.findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Aquamarine');
  });
});
