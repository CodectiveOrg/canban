import type { ReactNode } from "react";

import clsx from "clsx";

import styles from "./BoardCard.module.css";

type BoardColor = "gray" | "blue" | "green" | "yellow" | "orange" | "red";

type Props = {
  id: number;
  title: string;
  description: string;
  color: BoardColor;
};

export default function BoardCard({
  title,
  description,
  color,
}: Props): ReactNode {
  return (
    <div className={clsx(styles["board-card"], color)}>
      <div className={styles.cover}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <a href="/board">View</a>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
