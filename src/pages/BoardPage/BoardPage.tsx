import { type ReactNode } from "react";

import Board from "@/components/Board/Board.tsx";

import CounterProvider from "@/providers/CounterProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  return (
    <div className={styles["board-page"]}>
      <CounterProvider>
        <Board />
      </CounterProvider>
    </div>
  );
}
