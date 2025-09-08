import { type ActionDispatch, createContext } from "react";

import type { ListsAction } from "@/reducers/lists-reducer.ts";

import type { ListType } from "@/types/list.ts";

type ContextValue = {
  lists: ListType[];
  dispatchLists: ActionDispatch<[action: ListsAction]>;
};

export const BoardContext = createContext<ContextValue>({
  lists: [],
  dispatchLists: () => {},
});
