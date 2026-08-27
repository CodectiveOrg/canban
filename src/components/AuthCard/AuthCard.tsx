import type { PropsWithChildren, ReactNode } from "react";

import { Link } from "react-router";

import styles from "./AuthCard.module.css";

type Props = PropsWithChildren<{
  page: "sign-up" | "sign-in";
  title: string;
  subtitle: string;
}>;

export default function AuthCard({
  page,
  title,
  subtitle,
  children,
}: Props): ReactNode {
  return (
    <div className={styles["auth-card"]}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {page === "sign-up" ? (
          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>!
          </p>
        ) : (
          <p>
            Don't have an account yet? <Link to="/sign-up">Sign Up</Link>!
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
