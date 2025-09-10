import { createContext } from "react";

import type { BoardType } from "@/types/board.ts";

type ContextValue = {
  board: BoardType;
};

export const BoardPageContext = createContext<ContextValue>({} as ContextValue);
