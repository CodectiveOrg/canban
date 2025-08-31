import { createContext } from "react";

import type { ListType } from "@/types/list.ts";

type ContextValue = {
  lists: ListType[];
  create: () => void;
  move: (fromListId: string, itemId: string, toListId: string) => void;
  remove: (listId: string, itemId: string) => void;
};

export const BoardContext = createContext<ContextValue>({
  lists: [],
  create: () => {},
  move: () => {},
  remove: () => {},
});
