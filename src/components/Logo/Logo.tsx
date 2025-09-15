import type { ReactNode } from "react";

import { useSidebarStore } from "@/stores/sidebar-store.ts";

import styles from "./Logo.module.css";

export default function Logo(): ReactNode {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return <div className={styles.logo}>{isCollapsed ? "C" : "Canban"}</div>;
}
