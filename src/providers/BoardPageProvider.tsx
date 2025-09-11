import { type PropsWithChildren, type ReactNode } from "react";

import { BoardPageContext } from "@/context/board-page-context.ts";

import type { BoardType } from "@/types/board.ts";

type Props = PropsWithChildren<{
  board: BoardType;
}>;

export default function BoardPageProvider({
  board,
  children,
}: Props): ReactNode {
  return <BoardPageContext value={{ board }}>{children}</BoardPageContext>;
}
