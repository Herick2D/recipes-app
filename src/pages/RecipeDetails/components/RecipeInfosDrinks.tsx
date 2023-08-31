import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { Drink } from '../../../types';

type RecipeInfosDrinksProps = {
  item: Drink,
  drink: Drink[],
  entriesRecipe: [string, string][],
};

function RecipeInfosDrinks({ item, drink, entriesRecipe }: RecipeInfosDrinksProps) {
  return (
    <Box
      component="section"
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
          height: '230px',
          backgroundImage: `url(${item.strDrinkThumb})`,
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
              textShadow: '2px 2px 1px rgba(0, 0, 0, 0.5)',
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
            { item.strDrink }
          </Typography>
        </Box>
      </Paper>
      <Typography
        variant="subtitle2"
        color="primary"
        fontWeight={ 700 }
        data-testid="recipe-category"
        sx={ {
          position: 'absolute',
          left: '10px',
          top: '30px',
          textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
        } }
      >
        { item.strAlcoholic }
      </Typography>
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
              const measure = drink[0][`strMeasure${index + 1}` as keyof Drink];
              return (
                <ListItem
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${measure} - ${value}`}
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
    </Box>
  );
}

export default RecipeInfosDrinks;
