import Card from './components/Card';
import { Drink, Meal } from '../../types';
import CategoriesButtons from './components/CategoriesButtons';

type RecipesProps = {
  recipes: Drink[] | Meal[];
  pathname: string
};

function Recipes({ recipes, pathname }: RecipesProps) {
  return (
    <>
      <CategoriesButtons pathname={ pathname } />
      <ul>
        { recipes.length > 0
      && recipes.map((recipe, index) => (
        <li key={ index }>
          <Card location={ pathname } recipe={ recipe as Drink & Meal } index={ index } />
        </li>
      ))}
      </ul>
    </>

  );
}

export default Recipes;
