import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControlLabel, Radio,
  RadioGroup, Stack, TextField } from '@mui/material';
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
    <Stack
      component="form"
      onSubmit={ handleSearchSubmit }
      alignSelf="center"
      alignItems="center"
      p="0 0 10px 0"
      borderRadius={ 2 }
      sx={ {
        width: { xs: '95%', md: '50%' },
        backgroundColor: '#41197F',
        color: 'white',
        mb: 1,
      } }
    >
      <TextField
        type="text"
        value={ searchQuery }
        onChange={ (handleSearchQueryChange) }
        label="Search"
        variant="outlined"
        fullWidth
        inputProps={ { 'data-testid': 'search-input' } }
        sx={ {
          backgroundColor: 'white',
        } }
      />
      <RadioGroup
        onChange={ handleSearchTypeChange }
        row
      >
        <FormControlLabel
          name="search-type"
          value="ingredient"
          label="Ingredient"
          control={ <Radio size="small" /> }
          checked={ searchType === 'ingredient' }
          data-testid="ingredient-search-radio"
        />
        <FormControlLabel
          name="search-type"
          value="name"
          label="Name"
          control={ <Radio size="small" /> }
          checked={ searchType === 'name' }
          data-testid="name-search-radio"
        />
        <FormControlLabel
          name="search-type"
          value="firstLetter"
          control={ <Radio size="small" /> }
          checked={ searchType === 'firstLetter' }
          data-testid="first-letter-search-radio"
          label="First Letter"
        />
      </RadioGroup>
      <Button
        type="submit"
        data-testid="exec-search-btn"
        variant="contained"
        sx={ {
          width: { xs: '50%', md: '25%' },
        } }
      >
        Search
      </Button>
    </Stack>
  );
}

export default SearchBar;
