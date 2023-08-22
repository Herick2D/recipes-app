import { createContext, useState } from 'react';
import { Drink, Meal } from '../types';

type RecipiesContextsType = {
  recipies: Meal[] | Drink[];
  setRecipies: React.Dispatch<React.SetStateAction<Meal[] | Drink[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RecipiesContexts = createContext({} as RecipiesContextsType);

export function RecipiesProvider({ children }: { children: React.ReactNode }) {
  const [recipies, setRecipies] = useState<Meal[] | Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <RecipiesContexts.Provider
      value={ {
        recipies,
        setRecipies,
        isLoading,
        setIsLoading,
      } }
    >
      {children}
    </RecipiesContexts.Provider>
  );
}
