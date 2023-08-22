import { useContext } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Meal } from '../../types';

function MealId() {
  const { recipies } = useContext(RecipiesContexts);
  const meal = recipies as Meal[];

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
