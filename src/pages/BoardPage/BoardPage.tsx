import { type ReactNode } from "react";

import Board from "@/components/Board/Board.tsx";

import BoardProvider from "@/providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  return (
    <div className={styles["board-page"]}>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  );
}
