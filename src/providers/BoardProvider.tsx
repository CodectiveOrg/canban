import { type PropsWithChildren, type ReactNode, useEffect } from "react";

import { useImmerReducer } from "use-immer";

import { BoardContext } from "@/context/board-context.ts";

import { listsData } from "@/data/lists-data.ts";

import { listsReducer } from "@/reducers/lists-reducer.ts";

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
  const [lists, dispatchLists] = useImmerReducer(listsReducer, load());

  useEffect(() => {
    save(lists);
  }, [lists]);

  return (
    <BoardContext value={{ lists, dispatchLists }}>{children}</BoardContext>
  );
}
