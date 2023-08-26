import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import useFetchById from '../../hooks/useFetchById';
import RecipeInfos from './components/RecipeInfos';
import useFetchGeneric from '../../hooks/useFetchGeneric';
import Carousel from './components/Carousel';
import { DoneRecipe, InProgressRecipes } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

function Recipe() {
  const [entriesRecipe, setEntriesRecipe] = useState<[string, string][]>([]);
  const [inProgressRecipes,
    setInprogressRecipes] = useState<InProgressRecipes>({} as InProgressRecipes);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);

  const { data, loading } = useFetchById();
  const { drinksRecipes, mealsRecipes } = useFetchGeneric();
  const { value } = useLocalStorage('doneRecipes', JSON.stringify(doneRecipes));
  const {
    value: valueInProgress,
  } = useLocalStorage('inProgressRecipes', JSON.stringify(inProgressRecipes));
  const { pathname } = useLocation();

  const isMeals = pathname.includes('meals');
  const recipeId = pathname.split('/')[2];
  const location = pathname.split('/')[1];

  const isInProgress = inProgressRecipes[isMeals ? 'meals' : 'drinks']?.[recipeId];

  useEffect(() => {
    if (data[0]) {
      setEntriesRecipe(Object.entries(data[0]));
    }
  }, [data]);

  useEffect(() => {
    setDoneRecipes(JSON.parse(value));
    setInprogressRecipes(JSON.parse(valueInProgress));
  }, [value, valueInProgress]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <RecipeInfos location={ location } data={ data } entriesRecipe={ entriesRecipe } />
      {drinksRecipes.length > 1 ? (
        <Carousel drinks={ drinksRecipes.slice(0, 6) } />
      ) : (
        <Carousel meals={ mealsRecipes.slice(0, 6) } />
      )}
      {!doneRecipes.find((element) => element.id
      === drinksRecipes[0].idDrink || mealsRecipes[0].idMeal) && (
        <Button
          variant="contained"
          data-testid="start-recipe-btn"
          sx={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </Button>)}
    </main>
  );
}

export default Recipe;
