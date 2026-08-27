import type { PropsWithChildren, ReactNode } from "react";

import { Link } from "react-router";

import styles from "./AuthCard.module.css";

type Props = PropsWithChildren;

export default function AuthCard({ children }: Props): ReactNode {
  return (
    <div className={styles["auth-card"]}>
      <div className={styles.heading}>
        <h1>Welcome Back!</h1>
        <p>Enter your credentials to sign in.</p>
        <p>
          Don't have an account yet? <Link to="/sign-up">Sign Up</Link>!
        </p>
      </div>
      {children}
    </div>
  );
}
