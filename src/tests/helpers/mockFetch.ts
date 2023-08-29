import drinksMock from './drinksMock';
import { mealsMock } from './mealsMock';
import { DrinksCategoryMock, MealsCategoryMock } from './categoriesMock';
import oneDrink from './oneDrinkMock';
import oneMeal from './oneMealMock';
import beefMeals from './beefMealsMock';
import cocktailDrinks from './cocktailDrinksMock';
import { corbaMock } from './corbaMock';

const mockFetch = (url: any) => Promise.resolve({

  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(mealsMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinksMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata') { return Promise.resolve(oneMeal); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine') { return Promise.resolve(oneDrink); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') { return Promise.resolve(oneMeal); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') { return Promise.resolve(corbaMock); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') { return Promise.resolve(oneDrink); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=16405') { return Promise.resolve(oneDrink); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(DrinksCategoryMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(MealsCategoryMock); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve(beefMeals); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') { return Promise.resolve(cocktailDrinks); }
  },
});

export default mockFetch;
