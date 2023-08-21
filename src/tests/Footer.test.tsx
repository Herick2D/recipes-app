import { screen } from '@testing-library/react';
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
});
