import { useContext, useEffect, useState } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Meal } from '../../types';

function MealId() {
  const { recipies } = useContext(RecipiesContexts);
  const meal = recipies as Meal[];
  const [entriesMeal, setEntriesMeal] = useState<[string, string][]>([]);

  useEffect(() => {
    setEntriesMeal(Object.entries(meal[0]));
  }, [meal]);

  return (
    meal.map((item) => (
      <div key={ item.idMeal }>
        <h1>{ item.strMeal }</h1>
        <img
          src={ item.strMealThumb }
          alt={ item.strMeal }
          data-testid="recipe-photo"
        />
        <h2>Ingredients</h2>
        <ul>
          {entriesMeal.map(([key, value]) => {
            if (key.startsWith('strIngredient') && value) {
              const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
              const measure = meal[0][`strMeasure${index + 1}` as keyof Meal];
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${value} - ${measure}`}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    ))
  );
}

export default MealId;
