import { useContext } from 'react';
import { RecipiesContexts } from '../../contexts/recipiesContexts';
import { Drink } from '../../types';

function Drinks() {
  const { recipies, isLoading } = useContext(RecipiesContexts);
  const drinksArray = recipies.splice(0, 12) as Drink[];

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <ul>
      {drinksArray.map((drink, index) => (
        <li key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </li>
      ))}
    </ul>
  );
}

export default Drinks;
