import { type ReactNode } from "react";

import BoardLists from "@/components/Board/components/BoardLists/BoardLists.tsx";
import BoardToolbar from "@/components/Board/components/BoardToolbar/BoardToolbar.tsx";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  return (
    <div className={styles.board}>
      <BoardToolbar />
      <BoardLists />
    </div>
  );
}
