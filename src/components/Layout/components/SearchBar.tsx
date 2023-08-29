import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipesContexts } from '../../../contexts/recipesContexts';
import helperEndpoint from '../../../services/helperEndpoint';
import { RadioType } from '../../../types';

type SearchBarProps = {
  pathname: string;
};

function SearchBar({ pathname }: SearchBarProps) {
  const [searchType, setSearchType] = useState<RadioType>('ingredient');
  const [searchQuery, setSearchQuery] = useState('');
  const { setRecipes, setIsLoading } = useContext(RecipesContexts);
  const navigate = useNavigate();

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value as RadioType);
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFetch = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const endpoint = helperEndpoint(pathname, searchType, searchQuery, setIsLoading)
    || '';

    const data = await handleFetch(endpoint);
    const finalData = data?.drinks || data?.meals;

    if (finalData === null || finalData === undefined) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setRecipes(finalData);

    if (finalData.length === 1) {
      const { idDrink, idMeal } = finalData[0];
      if (pathname === '/drinks') {
        navigate(`/drinks/${idDrink}`);
      } else if (pathname === '/meals') {
        navigate(`/meals/${idMeal}`);
      }
    }
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
            data-testid="ingredient-search-radio"
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
            data-testid="name-search-radio"
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
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <input
        type="text"
        value={ searchQuery }
        onChange={ (handleSearchQueryChange) }
        placeholder="Enter search query"
        data-testid="search-input"
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
