export const fetchGeneric = async (pathname: string) => {
  if (pathname === '/meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
  if (pathname === '/drinks') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
};
