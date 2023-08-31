import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import useFetchById from '../../hooks/useFetchById';
import useLocalStorage from '../../hooks/useLocalStorage';
import { InProgressRecipes, FavoriteRecipe, DoneRecipe, Meal, Drink } from '../../types';
import RecipeCard from './components/RecipeCard';

function RecipeInProgress() {
  const [favorite, setFavorite] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { value: ingredientsValue,
    updateValue: updateIngredientsValue,
  } = useLocalStorage('inProgressRecipes', JSON.stringify({} as InProgressRecipes));
  const { data, loading } = useFetchById();
  const location = useLocation();
  const navigate = useNavigate();
  const { id: recipeId } = useParams();
  const {
    value: valueFavorites,
    updateValue: updateValueFavorites,
  } = useLocalStorage('favoriteRecipes', JSON.stringify([] as FavoriteRecipe[]));
  const {
    value: valueDoneRecipes,
    updateValue: updateValueDoneRecipes,
  } = useLocalStorage('doneRecipes', JSON.stringify([] as DoneRecipe[]));

  const recipe: any = location.pathname.includes('meals')
    ? data as Meal[] : data as Drink[];

  const isMeals = location.pathname.includes('meals');
  useEffect(() => {
    setFavorite(JSON.parse(valueFavorites)
      .find((element: FavoriteRecipe) => element.id === recipeId));
  }, [valueFavorites, recipeId]);

  const handleShareLink = async () => {
    try {
      const path = location.pathname.split('/')[1];
      await navigator.clipboard
        .writeText(`${window.location.origin}/${path}/${recipeId}`);
      setShareLink(true);
      setInterval(() => {
        setShareLink(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
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

    const favoritesRecipes = JSON.parse(valueFavorites) as FavoriteRecipe[];

    if (!favoritesRecipes.find((element) => element.id === recipeId)) {
      updateValueFavorites(JSON.stringify([...favoritesRecipes, favoriteRecipe]));
    } else {
      updateValueFavorites(JSON.stringify(favoritesRecipes
        .filter((element) => element.id !== recipeId)));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (ingredients.includes(name)) {
      setIngredients(ingredients.filter((element) => element !== name));
    } else {
      setIngredients([...ingredients, name]);
    }
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(ingredientsValue) as InProgressRecipes;

    if (location.pathname.includes('meals') && recipeId && ingredients.length > 0) {
      updateIngredientsValue(JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [recipeId]: [...ingredients],
        },
      }));
    }

    if (location.pathname.includes('drinks') && recipeId && ingredients.length > 0) {
      updateIngredientsValue(JSON.stringify({
        ...inProgressRecipes,
        drinks: {
          ...inProgressRecipes.drinks,
          [recipeId]: [...ingredients],
        },
      }));
    }

    if (location.pathname.includes('meals') && recipeId && ingredients.length === 0) {
      updateIngredientsValue(JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [recipeId]: [],
        },
      }));
    }

    if (location.pathname.includes('drinks') && recipeId && ingredients.length === 0) {
      updateIngredientsValue(JSON.stringify({
        ...inProgressRecipes,
        drinks: {
          ...inProgressRecipes.drinks,
          [recipeId]: [],
        },
      }));
    }
  }, [ingredients]);

  useEffect(() => {
    const ingredientsStorage = JSON.parse(ingredientsValue);
    const isMeal = location.pathname.includes('meals');

    if (recipeId && ingredientsStorage) {
      if (isMeal && ingredientsStorage.meals && ingredientsStorage.meals[recipeId]) {
        setIngredients(ingredientsStorage.meals[recipeId]);
      }
      if (!isMeal && ingredientsStorage.drinks && ingredientsStorage.drinks[recipeId]) {
        setIngredients(ingredientsStorage.drinks[recipeId]);
      }
    }
  }, []);

  const isRecipeDone = () => {
    if (recipe[0]) {
      const recipeIngredients = Object.entries(recipe[0])
        .filter((element) => element[0].includes('strIngredient'))
        .reduce((acc: any, curr: any) => {
          if (curr[1] !== '' && curr[1] !== null) {
            return [...acc, curr[1]];
          }
          return acc;
        }, []);

      return recipe[0] && ingredients.length === recipeIngredients.length;
    }
  };

  const handleClick = () => {
    navigate('/done-recipes');

    const doneRecipe = {
      id: recipe[0].idMeal || recipe[0].idDrink,
      type: recipe[0].idMeal ? 'meal' : 'drink',
      nationality: recipe[0].strArea || '',
      name: recipe[0].strMeal || recipe[0].strDrink,
      category: recipe[0].strCategory || '',
      image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      doneDate: new Date().toISOString(),
      tags: recipe[0].strTags ? recipe[0].strTags.split(',') : [],
    };

    const doneRecipes = JSON.parse(valueDoneRecipes) as DoneRecipe[];

    if (!doneRecipes.find((element) => element.id === recipeId) && recipeId) {
      updateValueDoneRecipes(JSON.stringify([...doneRecipes, doneRecipe]));
      const newInProgressRecipes = JSON.parse(ingredientsValue);
      delete newInProgressRecipes[isMeals ? 'meals' : 'drinks'][recipeId];
      updateIngredientsValue(JSON.stringify(newInProgressRecipes));
    }
  };

  if (loading) return (<Loading />);

  return (
    <main>
      <RecipeCard
        favorite={ favorite }
        handleFavorite={ handleFavorite }
        handleShareLink={ handleShareLink }
        recipe={ recipe }
        shareLink={ shareLink }
        handleChange={ handleChange }
        handleClick={ handleClick }
        ingredients={ ingredients }
        isRecipeDone={ isRecipeDone }
      />
    </main>
  );
}

export default RecipeInProgress;
