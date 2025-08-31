import { createContext } from "react";

type ContextValue = {
  activeListId: string | null;
  activeItemId: string | null;
  activate: (listId: string, itemId: string) => void;
  deactivate: () => void;
};

export const ActiveItemContext = createContext<ContextValue>({
  activeListId: null,
  activeItemId: null,
  activate: () => {},
  deactivate: () => {},
});
