import { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import useCategories from '../../../hooks/useCategories';
import { RecipesContexts } from '../../../contexts/recipesContexts';
import { fetchRecipesByCategory } from '../../../services/fetchCategories';
import providerIcons from '../../../services/providerIcons';
import allDrinks from '../../../images/AllDrinks.svg';
import allMeals from '../../../images/AllMeals.svg';
import Loading from '../../Loading';

function CategoriesButtons({ pathname }: { pathname: string }) {
  const [buttonName, setButtonName] = useState('');
  const { categories, loading } = useCategories();
  const {
    setRecipes,
    setCategoryRecipes,
    generalRecipes,
    setIsLoading,
  } = useContext(RecipesContexts);

  const handleClick = async (category: string) => {
    setIsLoading(true);
    if (buttonName !== category && category !== 'All') {
      setButtonName(category);
      const data = await fetchRecipesByCategory(pathname, category);
      setCategoryRecipes(data?.drinks || data?.meals);
      setRecipes(data?.drinks || data?.meals);
      setIsLoading(false);
    }

    if (category === 'All' || buttonName === category) {
      setRecipes(generalRecipes);
      setCategoryRecipes([]);
      setButtonName('');
      setIsLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    pathname === '/meals' || pathname === '/drinks' ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <Button
          onClick={ () => handleClick('All') }
          data-testid="All-category-filter"
          sx={ {
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
          } }
        >
          <Box component="img" src={ allMeals } />
          <Typography fontSize={ 10 } pt={ 1 }>
            All
          </Typography>
        </Button>
        {categories.slice(0, 5).map((category, index) => (
          <Button
            onClick={ () => handleClick(category.strCategory) }
            id={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index + Date.now() }
            sx={ {
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
            } }
          >
            <Box
              component="img"
              src={ providerIcons(pathname.split('/')[1])[index] }
              alt={ `${category.strCategory} icon` }
            />
            <Typography fontSize={ 10 } pt={ 1 }>
              {category.strCategory}
            </Typography>
          </Button>
        ))}
      </Box>
    ) : (
      null
    )
  );
}

export default CategoriesButtons;
