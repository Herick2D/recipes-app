import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Drink, Meal } from '../types';
import { fetchById } from '../services/fetchById';

function useFetchById() {
  const [data, setData] = useState<Meal[] | Drink[]>([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const location = pathname.split('/')[1];
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchById(location, id);
      if (location === 'meals' && response) setData(response.meals);
      if (location === 'drinks' && response) setData(response.drinks);
      setLoading(false);
    };

    getData();
  }, []);

  return { data, loading };
}

export default useFetchById;
