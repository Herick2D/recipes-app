import { useContext } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Drink } from '../../types';

function DrinkId() {
  const { recipies } = useContext(RecipiesContexts);
  const drink = recipies as Drink[];

  return (
    drink.map((item) => (
      <div key={ item.idDrink }>
        <h1 data-testid="recipe-title">{ item.strDrink }</h1>
        <img
          src={ item.strDrinkThumb }
          alt={ item.strDrink }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-category">{ item.strAlcoholic }</h2>
      </div>
    ))
  );
}

export default DrinkId;
