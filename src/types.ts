export type LoginFormType = {
  email: string;
  password: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strTags: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
};

export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strTags: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
};

export type RadioType = 'ingredient' | 'name' | 'firstLetter';
