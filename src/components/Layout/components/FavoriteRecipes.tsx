import { useEffect, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { FavoriteRecipe } from '../../../types';
import shareImg from '../../../images/shareIcon.svg';
import favoriteImg from '../../../images/blackHeartIcon.svg';
import './styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const {
    value: favoriteRecipes,
    updateValue,
  } = useLocalStorage<FavoriteRecipe[]>('favoriteRecipes', []);
  const [copied, setCopied] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState<FavoriteRecipe[]>([]);

  const handleFavorite = (id: string) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    updateValue(newFavoriteRecipes);
  };

  const handleClipBoard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
  };

  const filterByAll = () => {
    setFilteredFavRecipes(favoriteRecipes);
  };

  const filterByMeals = () => {
    const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
    setFilteredFavRecipes(filtered);
  };

  const filterByDrinks = () => {
    const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredFavRecipes(filtered);
  };

  useEffect(() => {
    setFilteredFavRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  return (
    <div className="card">
      <div>
        <h1>FavoriteRecipes</h1>
        <button
          data-testid="filter-by-all-btn"
          onClick={ filterByAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrinks }
        >
          Drinks
        </button>
      </div>
      <div>
        {filteredFavRecipes.map((recipe, index) => (
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
            { copied && <span>Link copied!</span> }
            <button onClick={ () => handleClipBoard(`${recipe.type}s/${recipe.id}`) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareImg }
                alt="share button"
              />
            </button>
            <button onClick={ () => handleFavorite(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favoriteImg }
                alt="favorite button"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
