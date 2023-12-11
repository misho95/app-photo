import { createContext } from "react";

interface ContextType {
  width: number | null;
  retrieveGapSize: (gap: number) => void;
}

export const divWidthContext = createContext<ContextType | null>(null);
