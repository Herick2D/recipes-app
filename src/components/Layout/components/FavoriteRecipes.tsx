import useLocalStorage from '../../../hooks/useLocalStorage';
import { FavoriteRecipe } from '../../../types';
import shareImg from '../../../images/shareIcon.svg';
import favoriteImg from '../../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const {
    value: favoriteRecipes,
  } = useLocalStorage<FavoriteRecipe[]>('favoriteRecipes', []);

  return (
    <>
      <div>
        <h1>FavoriteRecipes</h1>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </p>
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ shareImg } alt="share button" />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <img src={ favoriteImg } alt="favorite button" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
