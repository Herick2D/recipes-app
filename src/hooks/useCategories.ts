import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../services/fetchCategories';
import { RecipesContexts } from '../contexts/recipesContexts';

function useCategories() {
  const { categories, setCategories } = useContext(RecipesContexts);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetchCategories(pathname);
      if (pathname === '/meals') setCategories(response.meals);
      if (pathname === '/drinks') setCategories(response.drinks);
      setLoading(false);
    };

    getCategories();
  }, [pathname]);

  return {
    loading,
    categories,
    setCategories,
  };
}

export default useCategories;
