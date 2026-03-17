import type { ReactNode } from "react";
import React from "react";
import useBuilder from "../hooks/useBuilder";
import { BurgerContext } from "./BurgerContext";

export const BurgerProvider = ({ children }: { children: ReactNode }) => {
  const builder = useBuilder();
  return (
    <BurgerContext.Provider value={builder}>
      {children}
    </BurgerContext.Provider>
  );
};
