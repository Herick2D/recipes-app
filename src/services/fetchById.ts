export const fetchById = async (pathname: string, id: string | undefined) => {
  if (pathname === 'meals') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }
  if (pathname === 'drinks') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }
};
