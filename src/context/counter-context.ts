import { createContext } from "react";

type ContextValue = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const CounterContext = createContext<ContextValue>({} as ContextValue);
