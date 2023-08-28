import drinksMock from './drinksMock';
import { mealsMock } from './mealsMock';
import { DrinksCategoryMock, MealsCategoryMock } from './categoriesMock';
import oneDrink from './oneDrinkMock';
import oneMeal from './oneMealMock';

const mockFetch = (url: any) => Promise.resolve({

  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(mealsMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinksMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') { return Promise.resolve(oneMeal); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') { return Promise.resolve(oneDrink); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(DrinksCategoryMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(MealsCategoryMock); }
  },
});

export default mockFetch;
