import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DoneRecipe } from '../../types';
import allIcon from '../../images/allLogo.svg';
import allMealsIcon from '../../images/AllMeals.svg';
import allDrinksIcon from '../../images/AllDrinks.svg';
import ShareButton from './components/ShareButton';

function DoneRecipes() {
  const { value } = useLocalStorage('doneRecipes', JSON.stringify([] as DoneRecipe[]));
  const [recipes, setRecipes] = useState<DoneRecipe[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRecipes(JSON.parse(value));
  }, [value]);

  const handleFilter = (button: string) => {
    if (button === 'all') {
      setRecipes(JSON.parse(value));
    }
    if (button === 'meals') {
      setRecipes(JSON.parse(value)
        .filter((recipe: DoneRecipe) => recipe.type === 'meal'));
    }
    if (button === 'drinks') {
      setRecipes(JSON.parse(value)
        .filter((recipe: DoneRecipe) => recipe.type === 'drink'));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      component="main"
    >
      <Stack
        component="section"
        direction="row"
        spacing={ 2 }
        alignSelf="center"
      >
        <Button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          <Box component="img" height={ 66 } src={ allIcon } />
        </Button>
        <Button
          onClick={ () => handleFilter('meals') }
          data-testid="filter-by-meal-btn"
        >
          <Box component="img" height={ 66 } src={ allMealsIcon } />
        </Button>
        <Button
          onClick={ () => handleFilter('drinks') }
          data-testid="filter-by-drink-btn"
        >
          <Box component="img" height={ 66 } src={ allDrinksIcon } />
        </Button>
      </Stack>
      <Stack
        component="section"
        spacing={ 4 }
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        p={ 2 }
        mb={ 10 }
      >
        {recipes.map((recipe, index) => (
          <Paper
            elevation={ 5 }
            component={ Stack }
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={ {
              borderRadius: '10px',
              width: { xs: '90vw', sm: '400px' },
            } }
            key={ recipe.id }
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <Box
                component="img"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width={ 163 }
                minHeight={ 200 }
              />
            </Link>
            <Stack
              spacing={ 1 }
              width="100%"
              ml={ { xs: 4, sm: 10 } }
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="space-between"
              >
                <Typography
                  fontWeight={ 700 }
                  variant="h6"
                  fontSize={ 15 }
                  data-testid={ `${index}-horizontal-name` }
                  color="black"
                  sx={ {
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  } }

                >
                  {recipe.name}
                  <ShareButton
                    recipeType={ recipe.type }
                    recipeId={ recipe.id }
                    setCopied={ setCopied }
                    index={ index }
                  />
                </Typography>
                {recipe.type === 'meal' ? (
                  <Typography
                    fontWeight={ 300 }
                    color="#797D86"
                    variant="caption"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </Typography>
                ) : (
                  <Typography
                    fontWeight={ 300 }
                    color="#797D86"
                    variant="caption"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </Typography>
                )}
                <Typography
                  fontWeight={ 300 }
                  color="#797D86"
                  variant="caption"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.category}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                fontWeight={ 400 }
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </Typography>
              <Box display="flex" alignItems="center" gap={ 1 }>
                {recipe.tags.map((tag, i) => (
                  <Typography
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    variant="caption"
                    color="#797D86"
                    fontSize={ 11 }
                    fontWeight={ 400 }
                    sx={ {
                      backgroundColor: '#D9D9D9',
                      borderRadius: '20px',
                      p: 1,
                    } }
                  >
                    {tag}
                  </Typography>
                ))}
                {copied && (
                  <Typography
                    variant="caption"
                    fontSize={ 10 }
                  >
                    Link copied!
                  </Typography>)}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default DoneRecipes;
