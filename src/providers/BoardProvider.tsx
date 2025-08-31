import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { listsData } from "@/data/lists-data.ts";

import { BoardContext } from "@/context/board-context.ts";

import type { ListType } from "@/types/list.ts";

function save(lists: ListType[]): void {
  localStorage.setItem("lists", JSON.stringify(lists));
}

function load(): ListType[] {
  const item = localStorage.getItem("lists");
  if (!item) {
    return listsData;
  }

  return JSON.parse(item);
}

type Props = PropsWithChildren;

export default function BoardProvider({ children }: Props): ReactNode {
  const [lists, setLists] = useState<ListType[]>(load);

  useEffect(() => {
    save(lists);
  }, [lists]);

  const create = (): void => {
    setLists((old) => {
      const clone = [...old];

      const id = globalThis.crypto.randomUUID();
      clone[0] = { ...clone[0], items: [...clone[0].items, { id, title: id }] };

      return clone;
    });
  };

  const move = (fromListId: string, itemId: string, toListId: string): void => {
    setLists((old) => {
      const fromListIndex = old.findIndex((list) => list.id === fromListId);
      const toListIndex = old.findIndex((list) => list.id === toListId);

      if (fromListIndex === -1 || toListIndex === -1) {
        console.error("Cannot find desired list.");
        return old;
      }

      const clone = [...old];
      const fromList = {
        ...clone[fromListIndex],
        items: [...clone[fromListIndex].items],
      };
      const toList = {
        ...clone[toListIndex],
        items: [...clone[toListIndex].items],
      };

      const itemIndex = fromList.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        console.error("Cannot find desired item.");
        return old;
      }

      const [item] = fromList.items.splice(itemIndex, 1);
      toList.items.push(item);

      clone[fromListIndex] = fromList;
      clone[toListIndex] = toList;
      return clone;
    });
  };

  const remove = (listId: string, itemId: string): void => {
    setLists((old) => {
      const listIndex = old.findIndex((list) => list.id === listId);

      if (listIndex === -1) {
        console.error("Cannot find desired list.");
        return old;
      }

      const clone = [...old];
      const list = {
        ...clone[listIndex],
        items: [...clone[listIndex].items],
      };

      const itemIndex = list.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        console.error("Cannot find desired item.");
        return old;
      }

      list.items.splice(itemIndex, 1);

      clone[listIndex] = list;
      return clone;
    });
  };

  return (
    <BoardContext value={{ lists, create, move, remove }}>
      {children}
    </BoardContext>
  );
}
