import { Link } from 'react-router-dom';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Drink, Meal } from '../../../types';

type CardProps = {
  location: string;
  recipe: Meal & Drink;
  index: number;
};

function Card({ location, recipe, index }: CardProps) {
  const { idMeal, idDrink } = recipe;
  return (
    <Box
      component={ Link }
      to={ `${location}/${location === '/meals' ? idMeal : idDrink}` }
      sx={ {
        textDecoration: 'none',
      } }
    >
      <Paper
        elevation={ 3 }
        component={ Stack }
        direction="column"
        data-testid={ `${index}-recipe-card` }
        textAlign="center"
        pb={ 1 }
        sx={ {
          '&:hover': {
            transform: 'scale(1.03)',
            transition: '0.3s',
          },
        } }
      >
        <Box
          component="img"
          height={ 230 }
          data-testid={ `${index}-card-img` }
          src={ location === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ location === '/meals' ? recipe.strMeal : recipe.strDrink }
        />
        <Typography
          variant="subtitle1"
          data-testid={ `${index}-card-name` }
          fontWeight={ 400 }
          color="#1A1B1C"
          mt={ 2 }
        >
          {location === '/meals' ? recipe.strMeal : recipe.strDrink}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Card;
