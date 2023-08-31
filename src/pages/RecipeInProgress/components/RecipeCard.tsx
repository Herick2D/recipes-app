import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, Checkbox,
  FormControlLabel, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type RecipeCardProps = {
  recipe: any,
  handleFavorite: () => void,
  favorite: boolean,
  handleShareLink: () => void,
  shareLink: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  ingredients: string[],
  handleClick: () => void,
  isRecipeDone: () => boolean,
};

function RecipeCard({
  favorite,
  handleFavorite,
  handleShareLink,
  recipe,
  shareLink,
  handleChange,
  ingredients,
  handleClick,
  isRecipeDone,
}: RecipeCardProps) {
  return (
    <Box>
      <Box
        sx={ {
          position: 'absolute',
          right: 0,
        } }
      >
        <IconButton color="primary" onClick={ handleFavorite }>
          { favorite ? <FavoriteIcon
            data-testid="favorite-btn"
          /> : <FavoriteBorderIcon
            data-testid="favorite-btn"
          /> }
        </IconButton>
        <IconButton color="primary" onClick={ handleShareLink } data-testid="share-btn">
          <ShareIcon />
        </IconButton>
        {shareLink && (
          <Typography
            component="span"
            variant="subtitle2"
            color="black"
            fontWeight={ 700 }
          >
            Link copied!
          </Typography>)}
      </Box>
      <Paper
        component="article"
        elevation={ 5 }
        data-testid="recipe-photo"
        sx={ {
          height: '360px',
          backgroundImage: `url(${recipe[0]?.strMealThumb || recipe[0]?.strDrinkThumb})`,
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
            { recipe[0]?.strCategory }
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
            { recipe[0]?.strMeal || recipe[0]?.strDrink }
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
        {recipe[0] && (
          <List sx={ { border: '1px solid black', borderRadius: '10px' } }>
            {Array.from({ length: 15 }, (value, index) => index + 1).map((i) => {
              const recipeIngredients = recipe[0][`strIngredient${i}`];
              return recipeIngredients;
            }).filter((ingredient) => ingredient !== '' && ingredient !== null)
              .map((element, index) => (
                <ListItem
                  key={ element }
                >
                  <FormControlLabel
                    data-testid={ `${index}-ingredient-step` }
                    control={ <Checkbox
                      name={ element }
                      id={ `${index}-ingredient-step` }
                      onChange={ handleChange }
                      size="small"
                      checked={ ingredients.includes(element) }
                    /> }
                    label={ element }
                    sx={ { textDecoration: ingredients.includes(element)
                      ? 'line-through solid rgb(0, 0, 0)' : 'none',
                    display: 'block',
                    } }
                  />
                </ListItem>
              ))}
          </List>)}
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
            {recipe[0]?.strInstructions}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        data-testid="finish-recipe-btn"
        sx={ {
          position: 'fixed',
          bottom: '0',
          marginTop: '20%',
          marginLeft: '20%',
          width: '60%',
        } }
        onClick={ handleClick }
        disabled={ !isRecipeDone() }
      >
        Finish Recipe
      </Button>
    </Box>
  );
}

export default RecipeCard;
