import { useState, useEffect } from 'react';
import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import { Meal, Drink } from '../../../types';
import RecipeInfosDrinks from './RecipeInfosDrinks';

type RecipeInfosProps = {
  location: string,
  data: Meal[] | Drink[],
  entriesRecipe: [string, string][],
};

function RecipeInfos({ data, location, entriesRecipe }: RecipeInfosProps) {
  const [meal, setMeal] = useState<Meal[]>([]);
  const [drink, setDrink] = useState<Drink[]>([]);

  useEffect(() => {
    if (location === 'meals') {
      setMeal(data as Meal[]);
    } else {
      setDrink(data as Drink[]);
    }
  }, [data]);

  return (
    location === 'meals' ? (
      meal.map((item) => (
        (
          <Box
            component="section"
            key={ item.idMeal }
            sx={ {
              display: 'flex',
              flexDirection: 'column',
            } }
          >
            <Paper
              component="article"
              elevation={ 5 }
              data-testid="recipe-photo"
              sx={ {
                height: '360px',
                backgroundImage: `url(${item.strMealThumb})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '30px',
                textAlign: 'center',
              } }
            >
              <Box
                sx={ {
                  padding: '0 20px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                } }
              >
                <Typography
                  color="primary"
                  variant="h6"
                  data-testid="recipe-category"
                  fontWeight={ 700 }
                  sx={ {
                    position: 'absolute',
                    left: '10px',
                    top: 0,
                    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
                  } }
                >
                  { item.strCategory }
                </Typography>
                <Typography
                  variant="h4"
                  color="white"
                  data-testid="recipe-title"
                  fontWeight={ 700 }
                  sx={ {
                    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
                    alignSelf: 'center',
                  } }
                >
                  { item.strMeal }
                </Typography>
              </Box>
            </Paper>
            <Box p={ 2 }>
              <Typography
                variant="h5"
                p="10px 20px"
                fontWeight={ 700 }
              >
                Ingredients
              </Typography>
              <List sx={ { border: '1px solid black', borderRadius: '10px' } }>
                {entriesRecipe.map(([key, value]) => {
                  if (key.startsWith('strIngredient') && value) {
                    const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
                    const measure = meal[0][`strMeasure${index + 1}` as keyof Meal];
                    return (
                      <ListItem
                        key={ index }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {`${measure} ${value}  `}
                      </ListItem>
                    );
                  }
                  return null;
                })}
              </List>
            </Box>
            <Box p={ 2 }>
              <Typography
                variant="h5"
                p="10px 20px"
                fontWeight={ 700 }
              >
                Instructions
              </Typography>
              <Box
                sx={ {
                  border: '1px solid black',
                  borderRadius: '10px',
                } }
              >
                <Typography
                  variant="subtitle1"
                  textAlign="justify"
                  margin="10px"
                  display="block"
                  data-testid="instructions"
                >
                  {item.strInstructions}
                </Typography>
              </Box>
            </Box>
            <Box p={ 2 }>
              <Typography
                variant="h5"
                sx={ { padding: '10px 20px', fontWeight: '700' } }
              >
                Video
              </Typography>
              <Box
                component="iframe"
                data-testid="video"
                height={ 320 }
                maxWidth={ 500 }
                allowFullScreen
                src={ item.strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture; web-share"
                p={ 1 }
                width="100%"
              />
            </Box>
          </Box>
        )
      ))
    ) : (
      drink.map((item) => (
        <RecipeInfosDrinks
          key={ item.idDrink }
          item={ item }
          drink={ drink }
          entriesRecipe={ entriesRecipe }
        />
      ))
    )
  );
}

export default RecipeInfos;
