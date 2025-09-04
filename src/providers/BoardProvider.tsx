import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";

import { listsData } from "@/data/lists-data.ts";

import { BoardContext } from "@/context/board-context.ts";

import { listsReducer } from "@/reducers/lists-reducer.ts";

import type { ListItemType } from "@/types/list-item.ts";
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
  const [lists, dispatch] = useReducer(listsReducer, load());

  useEffect(() => {
    save(lists);
  }, [lists]);

  const create = (listId: string, item: ListItemType): void => {
    dispatch({ type: "created", listId, item });
  };

  const move = (fromListId: string, itemId: string, toListId: string): void => {
    dispatch({ type: "moved", fromListId, itemId, toListId });
  };

  const remove = (listId: string, itemId: string): void => {
    dispatch({ type: "removed", listId, itemId });
  };

  return (
    <BoardContext value={{ lists, create, move, remove }}>
      {children}
    </BoardContext>
  );
}
