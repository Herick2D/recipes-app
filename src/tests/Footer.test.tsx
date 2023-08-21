import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/RenderWithRouter';

describe('Testando componente Footer', () => {
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
    const Title = screen.getByTestId('page-title');

    await userEvent.click(drinksBtn);
    waitFor(() => expect(Title).toHaveTextContent('Drinks'));

    await userEvent.click(mealsBtn);
    waitFor(() => expect(Title).toHaveTextContent('Meals'));
  });
});
