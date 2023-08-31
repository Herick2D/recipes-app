import { Box, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drink, Meal } from '../../../types';

type CarouselProps = {
  drinks?: Drink[],
  meals?: Meal[],
};

function Carousel({ drinks = [], meals = [] }: CarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleNext = () => {
    const upperLimit = 4;
    if (carouselIndex < upperLimit) {
      setCarouselIndex((prevState) => (prevState + 2));
    } if (carouselIndex === upperLimit) {
      setCarouselIndex(0);
    }
  };

  const handleHidden = (aIndex: number) => (
    aIndex === carouselIndex || aIndex === carouselIndex + 1);

  const handleBack = () => {
    const lowerLimit = 0;
    const upperLimit = 4;
    if (carouselIndex > lowerLimit) {
      setCarouselIndex((prevState) => (prevState - 2));
    } if (carouselIndex === lowerLimit) {
      setCarouselIndex(upperLimit);
    }
  };

  return (
    <Box
      sx={ {
        margin: '5px 10px 50px 10px' } }
    >
      <Typography
        variant="h5"
        sx={ { padding: '10px 20px', fontWeight: '700' } }
      >
        Recommendation
      </Typography>
      <Box sx={ { display: 'flex', alignItems: 'center' } }>
        <IconButton
          className="btn btn-primary mx-2"
          type="button"
          onClick={ handleBack }
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
        {meals.map((item, i) => (
          <Box
            component={ Link }
            target="_blank"
            to={ `/meals/${item.idMeal}` }
            key={ item.strMeal }
            sx={ { textDecoration: 'none' } }
            maxWidth={ 250 }
          >
            <Paper
              elevation={ 3 }
              sx={ {
                borderRadius: '5px',
                textAlign: 'center',
                ml: '3px',
                mr: '3px',
              } }
              hidden={ !handleHidden(i) }
              data-testid={ `${i}-recommendation-card` }
            >
              <img
                className="img-thumbnail"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <Typography
                variant="subtitle1"
                data-testid={ `${i}-recommendation-title` }
              >
                {item.strMeal}
              </Typography>
            </Paper>
          </Box>
        ))}
        {drinks.map((item, i) => (
          <Box
            component={ Link }
            target="_blank"
            to={ `/drinks/${item.idDrink}` }
            key={ item.strDrink }
            sx={ { textDecoration: 'none' } }
            maxWidth={ 250 }
          >
            <Paper
              elevation={ 3 }
              sx={ {
                borderRadius: '5px',
                textAlign: 'center',
                ml: '3px',
                mr: '3px',
              } }
              hidden={ !handleHidden(i) }
              data-testid={ `${i}-recommendation-card` }
            >
              <img
                className="img-thumbnail"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <Typography
                variant="subtitle1"
                data-testid={ `${i}-recommendation-title` }
              >
                {item.strDrink}
              </Typography>
            </Paper>
          </Box>
        ))}
        <IconButton
          className="btn btn-primary"
          type="button"
          onClick={ handleNext }
        >
          <ArrowForwardIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Carousel;
