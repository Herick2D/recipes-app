import { useState, useEffect } from 'react';
import { Meal, Drink } from '../../../types';

type RecipeInfosProps = {
  location: string,
  data: Meal[] | Drink[],
  entriesRecipe: [string, string][],
};

function RecipeInfos({ data, location, entriesRecipe }: RecipeInfosProps) {
  const [meal, setMeal] = useState<Meal[]>([]);
  const [drink, setDrink] = useState<Drink[]>([]);

  useEffect(() => {
    if (location === 'meals') {
      setMeal(data as Meal[]);
    } else {
      setDrink(data as Drink[]);
    }
  }, [data]);

  return (
    location === 'meals' ? (
      meal.map((item) => (
        (
          <div key={ item.idMeal }>
            <h1 data-testid="recipe-title">{ item.strMeal }</h1>
            <p data-testid="recipe-category">
              { item.strCategory }
            </p>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
            />
            <h2>Ingredients</h2>
            <ul>
              {entriesRecipe.map(([key, value]) => {
                if (key.startsWith('strIngredient') && value) {
                  const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
                  const measure = meal[0][`strMeasure${index + 1}` as keyof Meal];
                  return (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
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
        )
      ))
    ) : (
      drink.map((item) => (
        <div key={ item.idDrink }>
          <h1 data-testid="recipe-title">{ item.strDrink }</h1>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-category"
          >
            { item.strAlcoholic }

          </h2>
          <h2>Ingredients</h2>
          <ul>
            {entriesRecipe.map(([key, value]) => {
              if (key.startsWith('strIngredient') && value) {
                const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
                const measure = drink[0][`strMeasure${index + 1}` as keyof Drink];
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${value} - ${measure}`}
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))
    )
  );
}

export default RecipeInfos;
