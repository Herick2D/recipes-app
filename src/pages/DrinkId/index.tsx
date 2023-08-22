import { useContext } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Drink } from '../../types';

function DrinkId() {
  const { recipies } = useContext(RecipiesContexts);
  const drink = recipies as Drink[];
  console.log(drink);

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
          {Object.entries(drink).map(([key, value]) => {
            if (key.startsWith('strIngredient') && value) {
              const index = parseInt(key.replace('strIngredient', ''), 10);
              const measure = drink[`strMeasure${index}` as keyof Drink];
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
