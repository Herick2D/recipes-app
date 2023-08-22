import { useContext, useEffect, useState } from 'react';
import { RecipesContexts } from '../../contexts/recipesContexts';
import { Meal } from '../../types';
import Recipes from '../../components/Recipes';
import { fetchGeneric } from '../../services/fetchGeneric';

function Meals() {
  const { recipes, isLoading, setRecipes, setIsLoading } = useContext(RecipesContexts);
  const [mealsArray, setMealsArray] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const data = await fetchGeneric('/meals');
      setIsLoading(false);
      setRecipes(data.meals);
    };

    fetchMeals();
  }, [setRecipes]);

  useEffect(() => {
    const MAX_RECIPES = 12;
    const mealsSliced = recipes.slice(0, MAX_RECIPES);
    setMealsArray(mealsSliced as Meal[]);
  }, [recipes]);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <main>
      <Recipes recipes={ mealsArray } pathname="/meals" />
    </main>
  );
}

export default Meals;
