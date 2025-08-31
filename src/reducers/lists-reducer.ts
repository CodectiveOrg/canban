import type { ListType } from "@/types/list.ts";

type Action =
  | {
      type: "created";
    }
  | {
      type: "moved";
      fromListId: string;
      itemId: string;
      toListId: string;
    }
  | {
      type: "removed";
      listId: string;
      itemId: string;
    };

export function listsReducer(state: ListType[], action: Action): ListType[] {
  switch (action.type) {
    case "created": {
      const clone = [...state];

      const id = globalThis.crypto.randomUUID();
      clone[0] = { ...clone[0], items: [...clone[0].items, { id, title: id }] };

      return clone;
    }
    case "moved": {
      const fromListIndex = state.findIndex(
        (list) => list.id === action.fromListId,
      );
      const toListIndex = state.findIndex(
        (list) => list.id === action.toListId,
      );

      if (fromListIndex === -1 || toListIndex === -1) {
        console.error("Cannot find desired list.");
        return state;
      }

      const clone = [...state];
      const fromList = {
        ...clone[fromListIndex],
        items: [...clone[fromListIndex].items],
      };
      const toList = {
        ...clone[toListIndex],
        items: [...clone[toListIndex].items],
      };

      const itemIndex = fromList.items.findIndex(
        (item) => item.id === action.itemId,
      );

      if (itemIndex === -1) {
        console.error("Cannot find desired item.");
        return state;
      }

      const [item] = fromList.items.splice(itemIndex, 1);
      toList.items.push(item);

      clone[fromListIndex] = fromList;
      clone[toListIndex] = toList;
      return clone;
    }
    case "removed": {
      const listIndex = state.findIndex((list) => list.id === action.listId);

      if (listIndex === -1) {
        console.error("Cannot find desired list.");
        return state;
      }

      const clone = [...state];
      const list = {
        ...clone[listIndex],
        items: [...clone[listIndex].items],
      };

      const itemIndex = list.items.findIndex(
        (item) => item.id === action.itemId,
      );

      if (itemIndex === -1) {
        console.error("Cannot find desired item.");
        return state;
      }

      list.items.splice(itemIndex, 1);

      clone[listIndex] = list;
      return clone;
    }
    default: {
      throw new Error("Unknown action.");
    }
  }
}
