import { createContext, useState } from 'react';
import { Drink, Meal } from '../types';

type RecipesContextsType = {
  recipes: Meal[] | Drink[];
  setRecipes: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RecipesContexts = createContext({} as RecipesContextsType);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <RecipesContexts.Provider
      value={ {
        recipes,
        setRecipes,
        isLoading,
        setIsLoading,
      } }
    >
      {children}
    </RecipesContexts.Provider>
  );
}
