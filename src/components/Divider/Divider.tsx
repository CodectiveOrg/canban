import type { PropsWithChildren, ReactNode } from "react";

import styles from "./Divider.module.css";

type Props = PropsWithChildren;

export default function Divider({ children }: Props): ReactNode {
  return <div className={styles.divider}>{children}</div>;
}
