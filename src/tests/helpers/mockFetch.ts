import beefMeals from './beefMealsMock';
import { DrinksCategoryMock, MealsCategoryMock } from './categoriesMock';
import drinksMock from './drinksMock';

const mockFetch = (url: any) => Promise.resolve({

  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(MealsCategoryMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(beefMeals); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(DrinksCategoryMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinksMock); }
  },
});

export default mockFetch;
