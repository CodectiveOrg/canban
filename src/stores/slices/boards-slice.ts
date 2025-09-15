import { boardsData } from "@/data/boards-data.ts";

import type { KanbanStateCreator } from "@/stores/kanban-store.ts";
import { withBoardIndex } from "@/stores/utils/kanban-utils.ts";

import type { BoardType } from "@/types/board.ts";

export type BoardsSlice = {
  boards: BoardType[];
  createBoard: (board: Omit<BoardType, "id" | "lists">) => void;
  editBoard: (boardId: string | undefined, board: Partial<BoardType>) => void;
  removeBoard: (boardId: string | undefined) => void;
};

export const createBoardsSlice: KanbanStateCreator<BoardsSlice> = (set) => ({
  boards: boardsData,
  createBoard: (board) =>
    set((state) => {
      const id = globalThis.crypto.randomUUID();
      state.boards.push({ id, lists: [], ...board });
    }),
  editBoard: (boardId, board) =>
    set((state) =>
      withBoardIndex(state, boardId, (boardIndex) => {
        state.boards[boardIndex] = { ...state.boards[boardIndex], ...board };
      }),
    ),
  removeBoard: (boardId) =>
    set((state) =>
      withBoardIndex(state, boardId, (boardIndex) => {
        state.boards.splice(boardIndex, 1);
      }),
    ),
});
