import { useContext, useState } from 'react';
import useCategories from '../../../hooks/useCategories';
import { RecipesContexts } from '../../../contexts/recipesContexts';
import { fetchRecipesByCategory } from '../../../services/fetchCategories';

function CategoriesButtons({ pathname }: { pathname: string }) {
  const [buttonName, setButtonName] = useState('');
  const { categories } = useCategories();
  const {
    setRecipes,
    setCategoryRecipes,
    generalRecipes,
  } = useContext(RecipesContexts);

  const handleClick = async (category: string) => {
    if (buttonName !== category && category !== 'All') {
      setButtonName(category);
      const data = await fetchRecipesByCategory(pathname, category);
      if (data) {
        setCategoryRecipes(data.drinks || data.meals);
        setRecipes(data.drinks || data.meals);
      }
    }

    if (category === 'All' || buttonName === category) {
      setRecipes(generalRecipes);
      setCategoryRecipes([]);
      setButtonName('');
    }
  };

  return (
    <div>
      {categories.slice(0, 5).map((category, index) => (
        <button
          onClick={ () => handleClick(category.strCategory) }
          type="button"
          id={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index + Date.now() }
        >
          {category.strCategory}
        </button>
      ))}
      {pathname.split('/')[1] === 'meals' && (
        <button
          onClick={ () => handleClick('All') }
          data-testid="All-category-filter"
        >
          All
        </button>)}
      {pathname.split('/')[1] === 'drinks' && (
        <button
          onClick={ () => handleClick('All') }
          data-testid="All-category-filter"
        >
          All
        </button>)}
    </div>
  );
}

export default CategoriesButtons;
