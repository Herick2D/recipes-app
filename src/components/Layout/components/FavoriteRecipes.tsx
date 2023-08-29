import { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { FavoriteRecipe } from '../../../types';
import shareImg from '../../../images/shareIcon.svg';
import favoriteImg from '../../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const {
    value: favoriteRecipes,
  } = useLocalStorage<FavoriteRecipe[]>('favoriteRecipes', []);
  const [copied, setCopied] = useState(false);

  const handleClipBoard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
  };

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
            { copied && <span>Link copied!</span> }
            <button onClick={ () => handleClipBoard(`${recipe.type}s/${recipe.id}`) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareImg }
                alt="share button"
              />
            </button>
            <button>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favoriteImg }
                alt="favorite button"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
