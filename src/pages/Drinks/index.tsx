import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { RecipesContexts } from '../../contexts/recipesContexts';
import { Drink } from '../../types';
import Recipes from '../../components/Recipes';
import { fetchGeneric } from '../../services/fetchGeneric';
import Loading from '../../components/Loading';

function Drinks() {
  const {
    recipes,
    isLoading,
    setRecipes,
    setIsLoading,
    setGeneralRecipes,
  } = useContext(RecipesContexts);
  const [drinksArray, setDrinksArray] = useState<Drink[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const data = await fetchGeneric('/drinks');
      setGeneralRecipes(data.drinks);
      setRecipes(data.drinks);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    const MAX_RECIPES = 12;
    const drinksSliced = recipes.slice(0, MAX_RECIPES);
    setDrinksArray(drinksSliced as Drink[]);
  }, [recipes]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box component="main" display="flex" alignItems="center" justifyContent="center">
      <Recipes recipes={ drinksArray } pathname="/drinks" />
    </Box>
  );
}

export default Drinks;
