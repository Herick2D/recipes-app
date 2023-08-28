import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
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
      <Stack
        direction="column"
        data-testid={ `${index}-recipe-card` }
      >
        <Box
          component="img"
          width={ 150 }
          height={ 150 }
          data-testid={ `${index}-card-img` }
          src={ location === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ location === '/meals' ? recipe.strMeal : recipe.strDrink }
        />
        <Typography data-testid={ `${index}-card-name` }>
          {location === '/meals' ? recipe.strMeal : recipe.strDrink}
        </Typography>
      </Stack>
    </Link>
  );
}

export default Card;
