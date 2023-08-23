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
      <CategoriesButtons />
      <ul>
        { recipes.length > 0
      && recipes.map((recipe, index) => (
        <li key={ recipe.strInstructions + recipe.strTags + recipe.strTags }>
          <Card location={ pathname } recipe={ recipe as Drink & Meal } index={ index } />
        </li>
      ))}
      </ul>
    </>

  );
}

export default Recipes;
