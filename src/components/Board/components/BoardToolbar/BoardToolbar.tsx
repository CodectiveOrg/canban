import type { ReactNode } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import styles from "./BoardToolbar.module.css";

export default function BoardToolbar(): ReactNode {
  return (
    <div className={styles["board-toolbar"]}>
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
  );
}
