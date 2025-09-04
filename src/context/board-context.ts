import { createContext } from "react";

import type { ListItemType } from "@/types/list-item.ts";
import type { ListType } from "@/types/list.ts";

type ContextValue = {
  lists: ListType[];
  create: (listId: string, item: ListItemType) => void;
  move: (fromListId: string, itemId: string, toListId: string) => void;
  remove: (listId: string, itemId: string) => void;
};

export const BoardContext = createContext<ContextValue>({
  lists: [],
  create: () => {},
  move: () => {},
  remove: () => {},
});
