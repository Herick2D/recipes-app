import { Box, Stack, Typography } from '@mui/material';
import { Drink, Meal } from '../../../types';

type CarouselProps = {
  drinks?: Drink[],
  meals?: Meal[],
};

function Carousel({ drinks = [], meals = [] }: CarouselProps) {
  return (
    <Stack spacing={ 4 } direction="row" overflow="auto" p={ 2 }>
      {drinks?.map((drink, index) => (
        <Box
          key={ Date.now() + index }
          data-testid={ `${index}-recommendation-card` }
        >
          <Box component="img" src={ drink.strDrinkThumb } width={ 150 } height={ 150 } />
          <Typography
            variant="h6"
            data-testid={ `${index}-recommendation-title` }
          >
            {drink.strDrink}
          </Typography>
        </Box>
      ))}
      {meals?.map((drink, index) => (
        <Box key={ Date.now() + index } data-testid={ `${index}-recommendation-card` }>
          <Box component="img" src={ drink.strMealThumb } width={ 150 } height={ 150 } />
          <Typography
            variant="h6"
            data-testid={ `${index}-recommendation-title` }
          >
            {drink.strMeal}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default Carousel;
