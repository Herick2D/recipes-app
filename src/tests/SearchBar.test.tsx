import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from './helpers/beefMealsMock';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import breakfastMeals from './helpers/breakfastMealsMock';
import oneMealMock from './helpers/oneMealMock';
import cocktailDrinks from './helpers/cocktailDrinksMock';
import oneDrink from './helpers/oneDrinkMock';
import drinksMock from './helpers/drinksMock';

describe('Teste SearchBar em Meals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const SEARCH_INPUT = 'search-input';
  const SUBMIT_BUTTON = 'exec-search-btn';

  test('Testa API para radio first letter', async () => {
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

    const radioFirst = screen.getByRole('radio', {
      name: /first letter/i,
    });

    expect(radioFirst).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(radioFirst);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'a');

    expect(radioFirst).toBeChecked();
    expect(searchInput).toHaveValue('a');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(1);
  });

  test('Testa o SearchBar quando faz uma pesquisa de ingrediente beef', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (beefMeals),
    });

    const title = screen.getByRole('heading', {
      name: /meals/i,
    });
    const searchBtn = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(title).toBeInTheDocument();
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

    userEvent.type(searchBar, 'beef');
    userEvent.click(submitBtn);

    const loading = await screen.findByText(/carregando.../i);

    expect(loading).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(1);

    const listItens = await screen.findAllByRole('listitem');
    const beefMealTitle = await screen.findByText(/braised beef chilli/i);
    const beefMealImg = await screen.findByRole('img', {
      name: /braised beef chilli/i,
    });

    expect(listItens[0]).toBeInTheDocument();
    expect(listItens).toHaveLength(12);
    expect(beefMealTitle).toBeInTheDocument();
    expect(beefMealImg).toBeInTheDocument();
  });

  test('Testa API para pesquisa pelo radio Name', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (breakfastMeals),
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

    userEvent.type(searchBar, 'breakfast');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    const loading = await screen.findByText(/carregando.../i);

    expect(global.fetch).toBeCalledTimes(1);
    expect(loading).toBeInTheDocument();

    const listItens = await screen.findAllByRole('listitem');
    const arrabiataMealTitle = await screen.findByText(/breakfast potatoes/i);
    const arrabiataMealImg = await screen.findByRole('img', {
      name: /breakfast potatoes/i,
    });

    expect(listItens[0]).toBeInTheDocument();
    expect(listItens).toHaveLength(7);
    expect(arrabiataMealTitle).toBeInTheDocument();
    expect(arrabiataMealImg).toBeInTheDocument();
  });

  test('Testa API para 1 receita encontrada', async () => {
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

    userEvent.type(searchBar, 'arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    const loading = await screen.findByText(/carregando.../i);

    expect(loading).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(1);

    const title = await screen.findByText(/arrabiata/i);
    const img = await screen.findByRole('img', {
      name: /arrabiata/i,
    });

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('Testa alert para 0 receitas', async () => {
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
  });

  test('Testa alert para mais de 1 leitra com radio first letter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchIcon = screen.getByRole('button', {
      name: /search icon/i,
    });

    await userEvent.click(searchIcon);

    const radioFirstLettter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await userEvent.click(radioFirstLettter);
    await userEvent.type(searchInput, 'xablau');

    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(submitBtn);

    expect(alert).toHaveBeenCalled();
  });
});

describe('Testa componente SearchBar em drinks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const SEARCH_INPUT = 'search-input';
  const SUBMIT_BUTTON = 'exec-search-btn';

  test('teste os componentes SearchBar em /drinks e faz uma pesquisa de ingrediente', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (cocktailDrinks),
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
    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const ingText = screen.getByText(/ingredient/i);
    const nameText = screen.getByText(/name/i);
    const letterText = screen.getByText(/first letter/i);

    expect(ingText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(letterText).toBeInTheDocument();
    expect(radioIng).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.type(searchInput, 'cocktail');
    await userEvent.click(radioIng);

    expect(radioIng).toBeChecked();

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(1);

    const drink = screen.getByText(/57 Chevy with a White License Plate/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa API para pesquisa pelo radio Name', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (cocktailDrinks),
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

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });

    expect(radioName).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.type(searchInput, 'cocktail');
    await userEvent.click(radioName);

    expect(radioName).toBeChecked();

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(1);

    const drink = screen.getByText(/Ace/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa API para radio first letter', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (drinksMock),
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

    expect(global.fetch).toBeCalledTimes(1);

    const drink = screen.getByText(/a piece of ass/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa API para 1 drink encontrado', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (oneDrink),
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

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });

    expect(radioName).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const submitBtn = screen.getByTestId(SUBMIT_BUTTON);

    await userEvent.click(radioName);
    await userEvent.type(searchInput, 'aquamarine');

    expect(radioName).toBeChecked();
    expect(searchInput).toHaveValue('aquamarine');

    await userEvent.click(submitBtn);

    expect(global.fetch).toBeCalledTimes(1);

    const drink = screen.getByText(/aquamarine/i);

    expect(drink).toBeInTheDocument();
  });

  test('Testa alert para 0 drinks', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: null }),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

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
});
