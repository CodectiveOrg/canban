import { arrayMove } from "@dnd-kit/sortable";

import type { KanbanStateCreator } from "@/stores/kanban-store.ts";
import { withBoard } from "@/stores/utils/kanban-utils.ts";

import type { ListItemType } from "@/types/list-item.ts";

export type ItemsSlice = {
  createItem: (
    boardId: string | undefined,
    listIndex: number,
    item: Omit<ListItemType, "id">,
  ) => void;
  editItem: (
    boardId: string | undefined,
    listIndex: number,
    itemIndex: number,
    item: Partial<ListItemType>,
  ) => void;
  removeItem: (
    boardId: string | undefined,
    listIndex: number,
    itemIndex: number,
  ) => void;
  moveItem: (
    boardId: string | undefined,
    activeListIndex: number,
    activeItemIndex: number,
    overItemIndex: number,
  ) => void;
  moveItemBetweenLists: (
    boardId: string | undefined,
    activeListIndex: number,
    activeItemIndex: number,
    overListIndex: number,
    overItemIndex?: number,
  ) => void;
};

export const createItemsSlice: KanbanStateCreator<ItemsSlice> = (set) => ({
  createItem: (boardId, listIndex, item) =>
    set((state) => {
      withBoard(state, boardId, (board) => {
        const list = board.lists[listIndex];
        const id = globalThis.crypto.randomUUID();
        list.items.push({ id, ...item });
      });
    }),
  editItem: (boardId, listIndex, itemIndex, item) =>
    set((state) => {
      withBoard(state, boardId, (board) => {
        const list = board.lists[listIndex];
        list.items[itemIndex] = { ...list.items[itemIndex], ...item };
      });
    }),
  removeItem: (boardId, listIndex, itemIndex) =>
    set((state) => {
      withBoard(state, boardId, (board) => {
        const list = board.lists[listIndex];
        list.items.splice(itemIndex, 1);
      });
    }),
  moveItem: (boardId, activeListIndex, activeItemIndex, overItemIndex) =>
    set((state) => {
      withBoard(state, boardId, (board) => {
        if (activeItemIndex === overItemIndex) {
          return;
        }

        const activeList = board.lists[activeListIndex];

        activeList.items = arrayMove(
          activeList.items,
          activeItemIndex,
          overItemIndex,
        );
      });
    }),
  moveItemBetweenLists: (
    boardId,
    activeListIndex,
    activeItemIndex,
    overListIndex,
    overItemIndex,
  ) =>
    set((state) => {
      withBoard(state, boardId, (board) => {
        if (activeListIndex === overListIndex) {
          return;
        }

        const activeList = board.lists[activeListIndex];
        const activeItem = activeList.items[activeItemIndex];
        const overList = board.lists[overListIndex];

        const newIndex = overItemIndex ?? overList.items.length;

        overList.items.splice(newIndex, 0, activeItem);
        activeList.items.splice(activeItemIndex, 1);
      });
    }),
});
