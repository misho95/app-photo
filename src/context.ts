import { createContext } from "react";

interface ContextType {
  divWidth: number | null;
  retrieveGapSize: (gap: number) => void;
}

export const divWidthContext = createContext<ContextType | null>(null);
