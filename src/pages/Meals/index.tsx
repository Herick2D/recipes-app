import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { RecipesContexts } from '../../contexts/recipesContexts';
import { Meal } from '../../types';
import Recipes from '../../components/Recipes';
import { fetchGeneric } from '../../services/fetchGeneric';
import Loading from '../../components/Loading';

function Meals() {
  const {
    recipes,
    isLoading,
    setRecipes,
    setIsLoading,
    setGeneralRecipes,
  } = useContext(RecipesContexts);
  const [mealsArray, setMealsArray] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const data = await fetchGeneric('/meals');
      setGeneralRecipes(data.meals);
      setRecipes(data.meals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    const MAX_RECIPES = 12;
    const mealsSliced = recipes.slice(0, MAX_RECIPES);
    setMealsArray(mealsSliced as Meal[]);
  }, [recipes]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <Box component="main" display="flex" alignItems="center" justifyContent="center">
      <Recipes recipes={ mealsArray } pathname="/meals" />
    </Box>
  );
}

export default Meals;
