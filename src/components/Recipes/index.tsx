import { Grid } from '@mui/material';
import Card from './components/Card';
import { Drink, Meal } from '../../types';

type RecipesProps = {
  recipes: Drink[] | Meal[];
  pathname: string
};

function Recipes({ recipes, pathname }: RecipesProps) {
  return (
    <Grid
      container
      rowSpacing={ { xs: 4, sm: 5 } }
      columnSpacing={ { xs: 1, sm: 2, md: 10 } }
      p={ 10 }
      width="100%"
    >
      {recipes?.map((recipe, index) => (
        <Grid
          key={ Date.now() + index }
          item
          xs={ 12 }
          sm={ 6 }
          md={ 3 }
        >
          <Card location={ pathname } recipe={ recipe as Drink & Meal } index={ index } />
        </Grid>
      ))}
    </Grid>
  );
}

export default Recipes;
