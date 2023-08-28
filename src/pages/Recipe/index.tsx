import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import isFavoriteIcon from '../../images/blackHeartIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import useFetchById from '../../hooks/useFetchById';
import RecipeInfos from './components/RecipeInfos';
import useFetchGeneric from '../../hooks/useFetchGeneric';
import Carousel from './components/Carousel';
import { DoneRecipe, FavoriteRecipe, InProgressRecipes } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

function Recipe() {
  const [entriesRecipe, setEntriesRecipe] = useState<[string, string][]>([]);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [shareLink, setShareLink] = useState(false);

  const { data, loading } = useFetchById();
  const { drinksRecipes, mealsRecipes } = useFetchGeneric();
  const { value } = useLocalStorage('doneRecipes', JSON.stringify(doneRecipes));
  const {
    value: valueInProgress,
    updateValue: updateValueInProgress,
  } = useLocalStorage('inProgressRecipes', JSON.stringify({} as InProgressRecipes[]));
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
    setFavorite(JSON.parse(valueFavorites)
      .find((element: FavoriteRecipe) => element.id === recipeId));
  }, [valueFavorites, recipeId]);

  const handleClick = () => {
    if (!isInProgress) {
      updateValueInProgress(JSON.stringify({
        ...JSON.parse(valueInProgress),
        [isMeals ? 'meals' : 'drinks']: {
          ...JSON.parse(valueInProgress)[isMeals ? 'meals' : 'drinks'],
          [recipeId]: entriesRecipe,
        },
      }));
    }

    navigate(`/${location}/${recipeId}/in-progress`);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`).then(
      () => {
        setShareLink(true);
      },
      () => {
        console.error('Erro ao copiar o link');
      },
    );
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
    return <p>Loading...</p>;
  }

  return (
    <main>
      <IconButton onClick={ handleShareLink } data-testid="share-btn">
        <ShareIcon />
      </IconButton>
      <button onClick={ handleFavorite }>
        <img
          src={ favorite ? isFavoriteIcon : favoriteIcon }
          alt="Favorite Icon"
          data-testid="favorite-btn"
        />
      </button>
      {shareLink && <span>Link copied!</span>}
      <RecipeInfos location={ location } data={ data } entriesRecipe={ entriesRecipe } />
      {drinksRecipes.length > 1 ? (
        <Carousel drinks={ drinksRecipes.slice(0, 6) } />
      ) : (
        <Carousel meals={ mealsRecipes.slice(0, 6) } />
      )}
      {!doneRecipes.find((element) => element.id
      === drinksRecipes[0].idDrink || mealsRecipes[0].idMeal) && (
        <Button
          variant="contained"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
          sx={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </Button>)}
    </main>
  );
}

export default Recipe;
