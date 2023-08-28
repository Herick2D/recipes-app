export const fetchCategories = async (pathname: string) => {
  if (pathname === '/meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }
  if (pathname === '/drinks') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }
};

export const fetchRecipesByCategory = async (pathname: string, category: string) => {
  if (pathname === '/meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data;
  }
  if (pathname === '/drinks') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data;
  }
};
