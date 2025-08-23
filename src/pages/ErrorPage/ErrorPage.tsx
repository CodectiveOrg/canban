import type { ReactNode } from "react";

import styles from "./ErrorPage.module.css";

export default function ErrorPage(): ReactNode {
  return (
    <div className={styles["error-page"]}>
      <h1>Oops! Something Went Wrong...</h1>
      <a href="/">Go to Home Page</a>
    </div>
  );
}
