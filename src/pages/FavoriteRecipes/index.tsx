import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import useLocalStorage from '../../hooks/useLocalStorage';
import { FavoriteRecipe } from '../../types';
import allIcon from '../../images/allLogo.svg';
import allMealsIcon from '../../images/AllMeals.svg';
import allDrinksIcon from '../../images/AllDrinks.svg';

function FavoriteRecipes() {
  const {
    value,
    updateValue,
  } = useLocalStorage('favoriteRecipes', JSON.stringify([] as FavoriteRecipe[]));
  const [copied, setCopied] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState<FavoriteRecipe[]>([]);

  const favoriteRecipes = JSON.parse(value);

  const handleFavorite = (id: string) => {
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe: FavoriteRecipe) => recipe.id !== id);
    updateValue(JSON.stringify(newFavoriteRecipes));
  };

  const handleClipBoard = async (url: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filterByAll = () => {
    setFilteredFavRecipes(favoriteRecipes);
  };

  const filterByMeals = () => {
    const filtered = favoriteRecipes
      .filter((recipe: FavoriteRecipe) => recipe.type === 'meal');
    setFilteredFavRecipes(filtered);
  };

  const filterByDrinks = () => {
    const filtered = favoriteRecipes
      .filter((recipe: FavoriteRecipe) => recipe.type === 'drink');
    setFilteredFavRecipes(filtered);
  };

  useEffect(() => {
    setFilteredFavRecipes(favoriteRecipes);
  }, [value]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Stack direction="row" spacing={ 2 } alignSelf="center">
        <Button
          data-testid="filter-by-all-btn"
          onClick={ filterByAll }
        >
          <Box component="img" height={ 66 } src={ allIcon } />
        </Button>
        <Button
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeals }
        >
          <Box component="img" height={ 66 } src={ allMealsIcon } />
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrinks }
        >
          <Box component="img" height={ 66 } src={ allDrinksIcon } />
        </Button>
      </Stack>
      <Stack
        component="main"
        spacing={ 4 }
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        p={ 2 }
        mb={ 10 }
      >
        {filteredFavRecipes.length > 0 && filteredFavRecipes.map((recipe, index) => (
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
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid="link-img"
            >
              <Box
                component="img"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                height={ 134 }
                width={ 163 }
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
              >
                <Typography
                  to={ `/${recipe.type}s/${recipe.id}` }
                  fontWeight={ 700 }
                  variant="h6"
                  component={ Link }
                  data-testid={ `${index}-horizontal-name` }
                  sx={ { textDecoration: 'none' } }
                  color="black"
                >
                  { recipe.name }
                </Typography>
                <Typography
                  fontWeight={ 300 }
                  color="#797D86"
                  variant="caption"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot }
                </Typography>
              </Box>
              <Box
                display="flex"
              >
                <IconButton
                  color="primary"
                  onClick={ () => handleClipBoard(`${recipe.type}s/${recipe.id}`) }
                >
                  <ShareIcon data-testid={ `${index}-horizontal-share-btn` } />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={ () => handleFavorite(recipe.id) }
                >
                  <FavoriteIcon
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </IconButton>
              </Box>
            </Stack>
          </Paper>
        ))}
        { copied && (
          <Typography fontSize={ 10 }>Link copied!</Typography>) }
      </Stack>
    </Box>
  );
}

export default FavoriteRecipes;
