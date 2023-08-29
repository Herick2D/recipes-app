import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { Button, IconButton } from '@mui/material';
import useFetchById from '../../../hooks/useFetchById';
import { Drink, FavoriteRecipe, InProgressRecipes, Meal } from '../../../types';
import isFavoriteIcon from '../../../images/blackHeartIcon.svg';
import favoriteIcon from '../../../images/whiteHeartIcon.svg';
import useLocalStorage from '../../../hooks/useLocalStorage';

function RecipeCard() {
  const [favorite, setFavorite] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const { value: ingredientsValue,
    updateValue: updateIngredientsValue,
  } = useLocalStorage('inProgressRecipes', {} as InProgressRecipes);
  const { data, loading } = useFetchById();
  const location = useLocation();
  const { id: recipeId } = useParams();
  const {
    value: valueFavorites,
    updateValue: updateValueFavorites,
  } = useLocalStorage('favoriteRecipes', [] as FavoriteRecipe[]);

  const recipe: any = location.pathname.includes('meals')
    ? data as Meal[] : data as Drink[];

  useEffect(() => {
    setFavorite(valueFavorites
      .some((element: FavoriteRecipe) => element.id === recipeId));
  }, [valueFavorites, recipeId]);

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${location.pathname}`).then(
      () => {
        setShareLink(true);
      },
      () => {
        console.error('Erro ao copiar o link');
      },
    );
  };

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

    const favoritesRecipes = valueFavorites as FavoriteRecipe[];

    if (!favoritesRecipes.find((element) => element.id === recipeId)) {
      updateValueFavorites([...favoritesRecipes, favoriteRecipe as FavoriteRecipe]);
    } else {
      updateValueFavorites(favoritesRecipes
        .filter((element) => element.id !== recipeId));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (ingredients.includes(name)) {
      setIngredients(ingredients.filter((element) => element !== name));
    } else {
      setIngredients([...ingredients, name]);
    }

    const inProgressRecipes = ingredientsValue as InProgressRecipes;

    if (location.pathname.includes('meals') && recipeId) {
      updateIngredientsValue({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [recipeId]: [...ingredients, name],
        },
      });
    }

    if (location.pathname.includes('drinks') && recipeId) {
      updateIngredientsValue({
        ...inProgressRecipes,
        drinks: {
          ...inProgressRecipes.drinks,
          [recipeId]: [...ingredients, name],
        },
      });
    }
  };

  useEffect(() => {
  //   const inProgressRecipes = JSON.parse(ingredientsValue) as InProgressRecipes;

    //   if (location.pathname.includes('meals') && recipeId) {
    //     setIngredients(inProgressRecipes.meals[recipeId] || ['']);
    //   }

    //   if (location.pathname.includes('drinks') && recipeId) {
    //     setIngredients(inProgressRecipes.drinks[recipeId] || ['']);
    //   }

    console.log(ingredients);
  }, [ingredients]);

  if (loading) return (<div>Loading...</div>);

  return (
    <div>
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
      <img
        src={ recipe[0]?.strMealThumb || recipe[0]?.strDrinkThumb }
        alt={ recipe[0]?.strMeal || recipe[0]?.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe[0]?.strMeal || recipe[0]?.strDrink}</h1>
      <p data-testid="recipe-category">{recipe[0]?.strCategory}</p>
      {recipe[0] && (
        <div>
          {Array.from({ length: 15 }, (value, index) => index + 1).map((i) => {
            const recipeIngredients = recipe[0][`strIngredient${i}`];
            return recipeIngredients;
          }).filter((ingredient) => ingredient !== '' && ingredient !== null)
            .map((element, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `${index}-ingredient-step` }
                key={ index + Date.now() }
                style={ { textDecoration: ingredients.includes(element)
                  ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
              >
                <input
                  type="checkbox"
                  name={ element }
                  id={ `${index}-ingredient-step` }
                  onChange={ handleChange }
                  checked={ ingredients.includes(element) }
                />
                {element}
              </label>
            ))}
        </div>)}
      <p data-testid="instructions">{recipe[0]?.strInstructions}</p>
      <Button
        variant="contained"
        data-testid="finish-recipe-btn"
        sx={ {
          position: 'fixed',
          bottom: 0,
        } }
      >
        Finish Recipe

      </Button>
    </div>
  );
}

export default RecipeCard;
