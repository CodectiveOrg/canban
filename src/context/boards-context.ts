import { type ActionDispatch, createContext } from "react";

import type { BoardsAction } from "@/reducers/boards-reducer.ts";

import type { BoardType } from "@/types/board.ts";

type ContextValue = {
  boards: BoardType[];
  dispatchBoards: ActionDispatch<[action: BoardsAction]>;
};

export const BoardsContext = createContext<ContextValue>({} as ContextValue);
