import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useFetchById from '../../hooks/useFetchById';
import RecipeInfos from './components/RecipeInfos';
import useFetchGeneric from '../../hooks/useFetchGeneric';
import Carousel from './components/Carousel';
import { DoneRecipe, FavoriteRecipe, InProgressRecipes } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import Loading from '../../components/Loading';

function Recipe() {
  const [entriesRecipe, setEntriesRecipe] = useState<[string, string][]>([]);
  const [doneRecipe, setDoneRecipe] = useState<DoneRecipe[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [shareLink, setShareLink] = useState(false);

  const { data, loading } = useFetchById();
  const { drinksRecipes, mealsRecipes } = useFetchGeneric();
  const {
    value: doneRecipesValue,
  } = useLocalStorage('doneRecipes', JSON.stringify([] as DoneRecipe[]));
  const {
    value: valueInProgress,
  } = useLocalStorage('inProgressRecipes', JSON.stringify({} as InProgressRecipes));
  const {
    value: valueFavorites,
    updateValue: updateValueFavorites,
  } = useLocalStorage('favoriteRecipes', JSON.stringify([] as FavoriteRecipe[]));

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMeals = pathname.includes('meals');
  const recipeId = pathname.split('/')[2];
  const location = pathname.split('/')[1];

  const isInProgress = JSON
    .parse(valueInProgress)[isMeals ? 'meals' : 'drinks']?.[recipeId];

  useEffect(() => {
    if (data[0]) {
      setEntriesRecipe(Object.entries(data[0]));
    }
  }, [data]);

  useEffect(() => {
    setDoneRecipe(JSON.parse(doneRecipesValue));
  }, []);

  useEffect(() => {
    setFavorite(JSON.parse(valueFavorites)
      .find((element: FavoriteRecipe) => element.id === recipeId));
  }, [valueFavorites, recipeId]);

  const handleClick = () => {
    navigate(`/${location}/${recipeId}/in-progress`);
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
      setShareLink(true);
      setInterval(() => {
        setShareLink(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
  };

  const recipe = data as any[];

  const handleFavorite = () => {
    const favoriteRecipe = {
      id: recipe[0].idMeal || recipe[0].idDrink,
      type: recipe[0].idMeal ? 'meal' : 'drink',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strMeal || recipe[0].strDrink,
      image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
    };

    const favoritesRecipes = JSON.parse(valueFavorites) as FavoriteRecipe[];

    if (!favoritesRecipes.find((element) => element.id === recipeId)) {
      updateValueFavorites(JSON.stringify([...favoritesRecipes, favoriteRecipe]));
    } else {
      updateValueFavorites(JSON.stringify(favoritesRecipes
        .filter((element) => element.id !== recipeId)));
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        {shareLink && <span>Link copied!</span>}
      </Box>
      <RecipeInfos location={ location } data={ data } entriesRecipe={ entriesRecipe } />
      {drinksRecipes.length ? (
        <Carousel drinks={ drinksRecipes.slice(0, 6) } />
      ) : (
        <Carousel meals={ mealsRecipes.slice(0, 6) } />
      )}
      {!doneRecipe.find((element: DoneRecipe) => element.id === recipeId) && (
        <Button
          variant="contained"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
          sx={ {
            position: 'fixed',
            bottom: '0',
            marginTop: '20%',
            marginLeft: '20%',
            width: '60%',
          } }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </Button>)}
    </Box>
  );
}

export default Recipe;
