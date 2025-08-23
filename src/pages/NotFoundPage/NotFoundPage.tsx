import type { ReactNode } from "react";

import { Link } from "react-router";

import styles from "./NotFoundPage.module.css";

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles["not-found-page"]}>
      <h1>404 | Page Not Found</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
