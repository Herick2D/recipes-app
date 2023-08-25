import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando componente Footer', () => {
  const TITLE_TEST_ID = 'page-title';

  test('Testando o Footer em /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const mealsBtn = screen.getByTestId('drinks-bottom-btn');
    const drinksBtn = screen.getByTestId('meals-bottom-btn');

    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
  test('Testando os CLicker do Footer', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    await userEvent.click(drinksBtn);

    expect(await screen.findByTestId(TITLE_TEST_ID)).toHaveTextContent('Drinks');

    await userEvent.click(mealsBtn);

    expect(await screen.findByTestId(TITLE_TEST_ID)).toHaveTextContent('Meals');
    screen.debug();
  });
});
