import type { ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import type { BoardType } from "@/types/board.ts";

import styles from "./BoardCard.module.css";

type Props = {
  board: BoardType;
};

export default function BoardCard({ board }: Props): ReactNode {
  return (
    <div className={clsx(styles["board-card"], board.color)}>
      <div className={styles.cover}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{board.title}</div>
          <Link to={`/board/${board.id}`}>View</Link>
        </div>
        <p className={styles.description}>{board.description}</p>
      </div>
    </div>
  );
}
