const helperEndpoint = (
  pathname: string,
  searchType: string,
  searchQuery: string,
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let endpoint = '';

  switch (pathname) {
    case '/drinks':
      if (searchType === 'ingredient') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      } else if (searchType === 'name') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      } else if (searchType === 'firstLetter') {
        if (searchQuery.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
          setIsloading(false);
          return;
        }
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchQuery}`;
      }
      break;
    case '/meals':
      if (searchType === 'ingredient') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      } else if (searchType === 'name') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      } else if (searchType === 'firstLetter') {
        if (searchQuery.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
          setIsloading(false);
          return;
        }
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`;
      }
      break;
    default:
      break;
  }

  return endpoint;
};

export default helperEndpoint;
