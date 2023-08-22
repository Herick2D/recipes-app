export const fetchGeneric = async (pathname: string) => {
  const response = pathname === '/meals' ? await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=') : await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};
