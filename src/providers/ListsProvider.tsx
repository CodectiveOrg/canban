import { type PropsWithChildren, type ReactNode, use, useEffect } from "react";

import { useImmerReducer } from "use-immer";

import { BoardPageContext } from "@/context/board-page-context.ts";
import { BoardsContext } from "@/context/boards-context.ts";
import { ListsContext } from "@/context/lists-context.ts";

import { listsReducer } from "@/reducers/lists-reducer.ts";

type Props = PropsWithChildren;

export default function ListsProvider({ children }: Props): ReactNode {
  const { dispatchBoards } = use(BoardsContext);
  const { board } = use(BoardPageContext);

  const [lists, dispatchLists] = useImmerReducer(listsReducer, board.lists);

  useEffect(() => {
    dispatchBoards({
      type: "board_edited",
      boardId: board.id,
      board: { lists },
    });
  }, [board.id, dispatchBoards, lists]);

  return (
    <ListsContext value={{ lists, dispatchLists }}>{children}</ListsContext>
  );
}
