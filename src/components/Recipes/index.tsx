import Card from './components/Card';
import { Drink, Meal } from '../../types';

type RecipesProps = {
  recipes: Drink[] | Meal[];
  pathname: string
};

function Recipes({ recipes, pathname }: RecipesProps) {
  return (
    <ul>
      { recipes.length > 0
      && recipes.map((recipe, index) => (
        <li key={ index + recipe.strTags }>
          <Card location={ pathname } recipe={ recipe as Drink & Meal } index={ index } />
        </li>
      ))}
    </ul>
  );
}

export default Recipes;
