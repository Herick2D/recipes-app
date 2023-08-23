import { createContext, useState } from 'react';
import { Categories, Drink, Meal } from '../types';

type RecipesContextsType = {
  recipes: Meal[] | Drink[];
  setRecipes: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Categories[];
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>
};

export const RecipesContexts = createContext({} as RecipesContextsType);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);

  return (
    <RecipesContexts.Provider
      value={ {
        recipes,
        setRecipes,
        isLoading,
        setIsLoading,
        categories,
        setCategories,
      } }
    >
      {children}
    </RecipesContexts.Provider>
  );
}
