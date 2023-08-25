import { useEffect, useState } from 'react';
import { Meal } from '../../types';
import useFetchById from '../../hooks/useFetchById';

function MealId() {
  const [entriesMeal, setEntriesMeal] = useState<[string, string][]>([]);
  const { data, loading } = useFetchById();
  const meal = data as Meal[];

  useEffect(() => {
    if (meal[0]) {
      setEntriesMeal(Object.entries(meal[0]));
    }
  }, [meal]);

  if (loading) return <h1>Loading...</h1>;

  return (
    meal.map((item) => (
      <div key={ item.idMeal }>
        <h1 data-testid="recipe-title">{ item.strMeal }</h1>
        <p data-testid="recipe-category">
          {' '}
          { item.strCategory }
        </p>
        <img
          src={ item.strMealThumb }
          alt={ item.strMeal }
          data-testid="recipe-photo"
        />
        <h2>Ingredients</h2>
        <ul>
          {entriesMeal.map(([key, value]) => {
            if (key.startsWith('strIngredient') && value) {
              const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
              const measure = meal[0][`strMeasure${index + 1}` as keyof Meal];
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${value} - ${measure}`}
                </li>
              );
            }
            return null;
          })}
        </ul>
        <p data-testid="instructions">{item.strInstructions}</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ item.strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    ))
  );
}

export default MealId;
