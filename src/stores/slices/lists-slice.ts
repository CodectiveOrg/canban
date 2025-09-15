import type { KanbanStateCreator } from "@/stores/kanban-store.ts";
import { withBoard } from "@/stores/utils/kanban-utils.ts";

import type { ListType } from "@/types/list.ts";

export type ListsSlice = {
  createList: (
    boardId: string | undefined,
    list: Omit<ListType, "id" | "items">,
  ) => void;
  editList: (
    boardId: string | undefined,
    listIndex: number,
    list: Partial<ListType>,
  ) => void;
  removeList: (boardId: string | undefined, listIndex: number) => void;
  moveList: (
    boardId: string | undefined,
    activeListIndex: number,
    overListIndex: number,
  ) => void;
};

export const createListsSlice: KanbanStateCreator<ListsSlice> = (set) => ({
  createList: (boardId, list) =>
    set((state) =>
      withBoard(state, boardId, (board) => {
        const id = globalThis.crypto.randomUUID();
        board.lists.push({ id, items: [], ...list });
      }),
    ),
  editList: (boardId, listIndex, list) =>
    set((state) =>
      withBoard(state, boardId, (board) => {
        board.lists[listIndex] = { ...board.lists[listIndex], ...list };
      }),
    ),
  removeList: (boardId, listIndex) =>
    set((state) =>
      withBoard(state, boardId, (board) => {
        board.lists.splice(listIndex, 1);
      }),
    ),
  moveList: (boardId, activeListIndex, overListIndex) =>
    set((state) =>
      withBoard(state, boardId, (board) => {
        if (activeListIndex === overListIndex) {
          return;
        }

        const activeList = board.lists[activeListIndex];

        board.lists.splice(activeListIndex, 1);
        board.lists.splice(overListIndex, 0, activeList);
      }),
    ),
});
