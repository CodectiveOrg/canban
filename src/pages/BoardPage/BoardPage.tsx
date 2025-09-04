import { type ReactNode } from "react";

import Board from "@/components/Board/Board.tsx";

import ActiveItemProvider from "@/providers/ActiveItemProvider.tsx";
import BoardProvider from "@/providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          <Board />
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}
