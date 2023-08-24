import { useContext, useEffect, useState } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Drink } from '../../types';

function DrinkId() {
  const { recipies } = useContext(RecipiesContexts);
  const drink = recipies as Drink[];
  const [entriesDrink, setEntriesDrink] = useState<[string, string][]>([]);

  useEffect(() => {
    setEntriesDrink(Object.entries(drink[0]));
  }, [drink]);

  return (
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
          {entriesDrink.map(([key, value]) => {
            if (key.startsWith('strIngredient') && value) {
              const index = parseInt(key.replace('strIngredient', ''), 10) - 1;
              const measure = drink[0][`strMeasure${index + 1}` as keyof Drink];
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${value} - ${measure}`}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    ))
  );
}

export default DrinkId;
