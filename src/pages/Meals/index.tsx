import { useContext } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Meal } from '../../types';

function Meals() {
  const { recipies, isLoading } = useContext(RecipiesContexts);
  const mealsArray = recipies.splice(0, 12) as Meal[];

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <ul>
      {mealsArray.map((meal, index) => (
        <li key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
        </li>
      ))}
    </ul>
  );
}

export default Meals;
