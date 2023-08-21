import { createContext, useState } from 'react';
import { Drinks, Meals } from '../types';

type RecipiesContextsType = {
  recipies: Meals[] | Drinks[];
  setRecipies: React.Dispatch<React.SetStateAction<Meals[] | Drinks[]>>;
};

export const RecipiesContexts = createContext({} as RecipiesContextsType);

export function RecipiesProvider({ children }: { children: React.ReactNode }) {
  const [recipies, setRecipies] = useState<Meals[] | Drinks[]>([]);

  return (
    <RecipiesContexts.Provider value={ { recipies, setRecipies } }>
      {children}
    </RecipiesContexts.Provider>
  );
}
