import { useContext, useState } from 'react';
import { RecipiesContexts } from '../../../contexts/recipiesContexts';

type SearchBarProps = {
  pathname: string;
};

function SearchBar({ pathname }: SearchBarProps) {
  const [searchType, setSearchType] = useState('ingredient');
  const [searchQuery, setSearchQuery] = useState('');
  const { setRecipies } = useContext(RecipiesContexts);

  const handleSearchTypeChange = (event: any) => {
    setSearchType(event.target.value);
  };

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleFetch = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    if (pathname === 'meals') {
      setRecipies(data.meals);
    } else if (pathname === 'drinks') {
      setRecipies(data.drinks);
    }
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();

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
            return;
          }
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`;
        }
        break;
      default:
        break;
    }

    handleFetch(endpoint);
  };

  return (
    <form onSubmit={ handleSearchSubmit }>
      <div>
        <label>
          <input
            type="radio"
            name="search-type"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="name"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="firstLetter"
            checked={ searchType === 'firstLetter' }
            onChange={ handleSearchTypeChange }
          />
          First Letter
        </label>
      </div>
      <div>
        <input
          type="text"
          value={ searchQuery }
          onChange={ handleSearchQueryChange }
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
