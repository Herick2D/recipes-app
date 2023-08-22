import { useContext } from 'react';
import { RecipesContexts } from '../../contexts/recipesContexts';
import { Meal } from '../../types';

function MealId() {
  const { recipes } = useContext(RecipesContexts);
  const meal = recipes as Meal[];

  return (
    meal.map((item) => (
      <div key={ item.idMeal }>
        <h1>{ item.strMeal }</h1>
        <img
          src={ item.strMealThumb }
          alt={ item.strMeal }
          data-testid="recipe-photo"
        />
      </div>
    ))
  );
}

export default MealId;
