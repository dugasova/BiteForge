import { createContext, useContext } from "react";

export interface BurgerContextType {
  stateBuilder: {
    ingredients: { [key: string]: number };
    sequence: string[];
    totalPrice: number;
    totalKkal: number;
    fastDelivery: boolean;
  };
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  resetBuilder: () => void;
  toggleFastDelivery: () => void;
}

export const BurgerContext = createContext<BurgerContextType | null>(null);

export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (!context) {
    throw new Error("useBurger must be used within a BurgerProvider");
  }
  return context;
};
