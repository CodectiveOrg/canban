import type { ReactNode } from "react";

import clsx from "clsx";

import { useThemeStore } from "@/stores/theme-store.ts";

import styles from "./ThemeSwitch.module.css";

export default function ThemeSwitch(): ReactNode {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={clsx(styles["theme-switch"], styles[theme])}>
      Dark Mode
      <div className={styles.track}>
        <div className={styles.thumb}></div>
      </div>
    </div>
  );
}
