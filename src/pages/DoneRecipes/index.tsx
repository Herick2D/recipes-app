import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DoneRecipe } from '../../types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const { value } = useLocalStorage('doneRecipes', JSON.stringify([] as DoneRecipe[]));
  const [recipes, setRecipes] = useState<DoneRecipe[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRecipes(JSON.parse(value));
  }, [value]);

  const handleFilter = (button: string) => {
    if (button === 'all') {
      setRecipes(JSON.parse(value));
    }
    if (button === 'meals') {
      setRecipes(JSON.parse(value)
        .filter((recipe: DoneRecipe) => recipe.type === 'meal'));
    }
    if (button === 'drinks') {
      setRecipes(JSON.parse(value)
        .filter((recipe: DoneRecipe) => recipe.type === 'drink'));
    }
  };

  const handleClipBoard = async (type: string, id:string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Erro ao copiar o link');
    }
  };

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          onClick={ () => handleFilter('meals') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleFilter('drinks') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {recipes.length && recipes.map((recipe, index) => (
        <div key={ recipe.id } style={ { marginBottom: '50px' } }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              style={ { width: '300px', height: '250px' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          )}
          {recipe.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
          <button onClick={ () => handleClipBoard(recipe.type, recipe.id) }>
            <img
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="Share icon"
            />
          </button>
          {copied && <span>Link copied!</span>}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
