import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchById from '../../hooks/useFetchById';
import RecipeInfos from './components/RecipeInfos';

function Recipe() {
  const [entriesRecipe, setEntriesRecipe] = useState<[string, string][]>([]);
  const { data, loading } = useFetchById();
  const { pathname } = useLocation();
  const location = pathname.split('/')[1];

  useEffect(() => {
    if (data[0]) {
      setEntriesRecipe(Object.entries(data[0]));
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <RecipeInfos location={ location } data={ data } entriesRecipe={ entriesRecipe } />
  );
}

export default Recipe;
