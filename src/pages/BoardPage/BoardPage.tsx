import { type ReactNode, useState } from "react";

import Board from "@/components/Board/Board.tsx";

import { CounterContext } from "@/context/counter-context.ts";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => {
    setCount((old) => old + 1);
  };

  const decrement = (): void => {
    setCount((old) => old - 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  return (
    <div className={styles["board-page"]}>
      <CounterContext value={{ count, increment, decrement, reset }}>
        <Board />
      </CounterContext>
    </div>
  );
}
