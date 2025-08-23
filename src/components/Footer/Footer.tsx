import { type ReactNode } from "react";

import styles from "./Footer.module.css";

export default function Footer(): ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>Copyright &copy; {year} canban.ir</footer>
  );
}
