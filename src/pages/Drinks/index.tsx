import { useContext, useEffect, useState } from 'react';
import { RecipesContexts } from '../../contexts/recipesContexts';
import { Drink } from '../../types';
import Recipes from '../../components/Recipes';
import { fetchGeneric } from '../../services/fetchGeneric';

function Drinks() {
  const { recipes, isLoading, setIsLoading, setRecipes } = useContext(RecipesContexts);
  const [drinksArray, setDrinksArray] = useState<Drink[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const data = await fetchGeneric('/drinks');
      setIsLoading(false);
      setRecipes(data.drinks);
    };

    fetchMeals();
  }, [setRecipes]);

  useEffect(() => {
    const MAX_RECIPES = 12;
    const drinksSliced = recipes.slice(0, MAX_RECIPES);
    setDrinksArray(drinksSliced as Drink[]);
  }, [recipes]);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <main>
      <Recipes recipes={ drinksArray } pathname="/drinks" />
    </main>
  );
}

export default Drinks;
