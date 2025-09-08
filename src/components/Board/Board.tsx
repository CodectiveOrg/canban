import { type ReactNode, use } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import { BoardContext } from "@/context/board-context.ts";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const { lists } = use(BoardContext);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list, listIndex) => (
          <li key={list.id}>
            <List listIndex={listIndex} list={list} />
          </li>
        ))}
      </ul>
    </div>
  );
}
