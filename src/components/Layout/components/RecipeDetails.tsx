import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Meal, Drink } from '../../../types';

function RecipeDetails() {
  const { pathname, id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<Meal | Drink>({});

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      let endpoint = '';
      if (pathname === '/meals') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (pathname === '/drinks') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipeDetails(data.meals?.[0] || data.drinks?.[0] || {});
    };

    fetchRecipeDetails();
  }, [id, pathname]);

  return (
    <div>
      <h2>CHEGOU AQUI</h2>
      <img
        src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
        alt={ recipeDetails.strDrink || recipeDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { recipeDetails.strDrink || recipeDetails.strMeal }
      </h1>
      <p data-testid="recipe-category">
        {pathname === '/meals' ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
      </p>
      <h2>Ingredients</h2>
      <ul>
        {Object.entries(recipeDetails).map(([key, value]) => {
          if (key.startsWith('strIngredient') && value) {
            const index = key.split('strIngredient')[1];
            const measure = recipeDetails[`strMeasure${index}`];
            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${value} - ${measure}`}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">
        {recipeDetails.strInstructions}
      </p>
      {pathname === '/meals' && (
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube?.split('v=')[1]}` }
          allowFullScreen
          data-testid="video"
        />
      )}
      <h2>Recommendations</h2>
      <div>
        {/* Lógica das recomendações que eu ainda não fiz */}
      </div>
    </div>
  );
}

export default RecipeDetails;
