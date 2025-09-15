import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  type BoardsSlice,
  createBoardsSlice,
} from "@/stores/slices/boards-slice.ts";
import {
  type ItemsSlice,
  createItemsSlice,
} from "@/stores/slices/items-slice.ts";
import {
  type ListsSlice,
  createListsSlice,
} from "@/stores/slices/lists-slice.ts";

export type KanbanState = BoardsSlice & ListsSlice & ItemsSlice;

export type KanbanStateCreator<T> = StateCreator<
  KanbanState,
  [["zustand/immer", never]],
  [],
  T
>;

export const useKanbanStore = create<KanbanState>()(
  persist(
    immer((...args) => ({
      ...createBoardsSlice(...args),
      ...createListsSlice(...args),
      ...createItemsSlice(...args),
    })),
    { name: "boards" },
  ),
);
