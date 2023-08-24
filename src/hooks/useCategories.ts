import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../services/fetchCategories';
import { RecipesContexts } from '../contexts/recipesContexts';

function useCategories() {
  const { categories, setCategories } = useContext(RecipesContexts);
  const { pathname } = useLocation();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories(pathname);
      setCategories(response.meals || response.drinks);
    };

    getCategories();
  }, []);

  return {
    categories,
    setCategories,
  };
}

export default useCategories;
