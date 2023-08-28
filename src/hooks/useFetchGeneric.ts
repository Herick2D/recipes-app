import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Meal, Drink } from '../types';
import { fetchGeneric } from '../services/fetchGeneric';

function useFetchGeneric() {
  const [mealsRecipes, setMealsRecipes] = useState<Meal[]>([]);
  const [drinksRecipes, setDrinksRecipes] = useState<Drink[]>([]);
  const { pathname } = useLocation();
  const location = `/${pathname.split('/')[1]}`;

  useEffect(() => {
    const getData = async () => {
      if (location === '/meals') {
        const data = await fetchGeneric('/drinks');
        setDrinksRecipes(data.drinks);
      }

      if (location === '/drinks') {
        const data = await fetchGeneric('/meals');
        setMealsRecipes(data.meals);
      }
    };

    getData();
  }, []);

  return {
    mealsRecipes,
    drinksRecipes,
  };
}

export default useFetchGeneric;
