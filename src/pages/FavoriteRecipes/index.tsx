import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shareImg from '../../images/shareIcon.svg';
import favoriteImg from '../../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { FavoriteRecipe } from '../../types';

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
    <div className="card">
      <div>
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
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid="link-img"
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                height={ 100 }
                width={ 100 }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </p>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            </Link>
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
