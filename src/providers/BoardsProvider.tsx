import { type PropsWithChildren, type ReactNode, useEffect } from "react";

import { useImmerReducer } from "use-immer";

import { BoardsContext } from "@/context/boards-context.ts";

import { boardsData } from "@/data/boards-data.ts";

import { boardsReducer } from "@/reducers/boards-reducer.ts";

import type { BoardType } from "@/types/board.ts";

function save(boards: BoardType[]): void {
  localStorage.setItem("boards", JSON.stringify(boards));
}

function load(): BoardType[] {
  const item = localStorage.getItem("boards");
  if (!item) {
    return boardsData;
  }

  return JSON.parse(item);
}

type Props = PropsWithChildren;

export default function BoardsProvider({ children }: Props): ReactNode {
  const [boards, dispatchBoards] = useImmerReducer(
    boardsReducer,
    undefined,
    load,
  );

  useEffect(() => {
    save(boards);
  }, [boards]);

  return (
    <BoardsContext value={{ boards, dispatchBoards }}>{children}</BoardsContext>
  );
}
