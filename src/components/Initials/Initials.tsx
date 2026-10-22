import type { ReactNode } from "react";

import clsx from "clsx";

import type { BoardColor } from "@/types/board.ts";

import styles from "./Initials.module.css";

type Props = {
  className?: string;
  title: string;
  color: BoardColor;
  size?: number;
};

export default function Initials({
  className,
  title,
  color,
  size,
}: Props): ReactNode {
  const parts = title.trim().split(/\s+/);
  const firstLetter = parts[0][0];
  const secondLetter = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";
  const initials = `${firstLetter}${secondLetter}`;

  return (
    <div
      className={clsx(styles.initials, color, className)}
      style={{ fontSize: `${size}px` }}
    >
      <div className={styles.text}>{initials}</div>
    </div>
  );
}
