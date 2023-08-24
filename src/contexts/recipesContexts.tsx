import { createContext, useState } from 'react';
import { Categories, Drink, Meal } from '../types';

type RecipesContextsType = {
  recipes: Meal[] | Drink[];
  setRecipes: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Categories[];
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  generalRecipes: Meal[] | Drink[];
  setGeneralRecipes: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>
  categoryRecipes: Meal[] | Drink[];
  setCategoryRecipes: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>
};

export const RecipesContexts = createContext({} as RecipesContextsType);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [generalRecipes, setGeneralRecipes] = useState<Meal[] | Drink[]>([]);
  const [categoryRecipes, setCategoryRecipes] = useState<Meal[] | Drink[]>([]);

  return (
    <RecipesContexts.Provider
      value={ {
        recipes,
        setRecipes,
        isLoading,
        setIsLoading,
        categories,
        setCategories,
        generalRecipes,
        setGeneralRecipes,
        categoryRecipes,
        setCategoryRecipes,
      } }
    >
      {children}
    </RecipesContexts.Provider>
  );
}
