import type { ReactNode } from "react";

import styles from "./Loading.module.css";

export default function Loading(): ReactNode {
  return <div className={styles.loading}>Loading...</div>;
}
