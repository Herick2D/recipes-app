import { Link } from 'react-router-dom';
import { Drink, Meal } from '../../../types';

type CardProps = {
  location: string;
  recipe: Meal & Drink;
  index: number;
};

function Card({ location, recipe, index }: CardProps) {
  const { idMeal, idDrink } = recipe;
  return (
    <Link
      to={ `${location}/${location === '/meals' ? idMeal : idDrink}` }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ location === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ location === '/meals' ? recipe.strMeal : recipe.strDrink }
        />
        <h3 data-testid={ `${index}-card-name` }>
          {location === '/meals' ? recipe.strMeal : recipe.strDrink}
        </h3>
      </div>
    </Link>
  );
}

export default Card;
