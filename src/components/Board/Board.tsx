import { type ReactNode } from "react";

import BoardLists from "@/components/Board/components/BoardLists/BoardLists.tsx";
import BoardToolbar from "@/components/Board/components/BoardToolbar/BoardToolbar.tsx";

import type { BoardType } from "@/types/board.ts";

import styles from "./Board.module.css";

type Props = {
  board: BoardType;
};

export default function Board({ board }: Props): ReactNode {
  return (
    <div className={styles.board}>
      <BoardToolbar board={board} />
      <BoardLists lists={board.lists} />
    </div>
  );
}
