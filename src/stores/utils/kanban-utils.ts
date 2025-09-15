import type { WritableDraft } from "immer";

import type { KanbanState } from "@/stores/kanban-store.ts";

import type { BoardType } from "@/types/board.ts";

export function withBoardIndex(
  state: WritableDraft<KanbanState>,
  boardId: string | undefined,
  callback: (boardIndex: number) => void,
): void {
  const boardIndex = state.boards.findIndex((board) => board.id === boardId);

  if (boardIndex === -1) {
    return;
  }

  callback(boardIndex);
}

export function withBoard(
  state: WritableDraft<KanbanState>,
  boardId: string | undefined,
  callback: (board: BoardType) => void,
): void {
  withBoardIndex(state, boardId, (boardIndex) => {
    callback(state.boards[boardIndex]);
  });
}
