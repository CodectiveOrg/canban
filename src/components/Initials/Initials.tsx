import type { ReactNode } from "react";

import clsx from "clsx";

import type { BoardColor } from "@/types/board.ts";

import styles from "./Initials.module.css";

type Props = {
  className?: string;
  title: string;
  color: BoardColor;
};

export default function Initials({
  className,
  title,
  color,
}: Props): ReactNode {
  const parts = title.trim().split(/\s+/);
  const initials = `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`;

  return (
    <div className={clsx(styles.initials, color, className)}>
      <div className={styles.text}>{initials}</div>
    </div>
  );
}
