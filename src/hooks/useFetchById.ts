import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Drink, Meal } from '../types';
import { fetchById } from '../services/fetchById';

function useFetchById() {
  const [data, setData] = useState<Meal[] | Drink[]>([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchById(pathname.split('/')[1], id);
      setData(response.meals || response.drinks);
      setLoading(false);
    };

    getData();
  }, [id]);

  return { data, loading };
}

export default useFetchById;
