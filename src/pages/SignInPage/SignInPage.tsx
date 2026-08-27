import type { ReactNode } from "react";

import AuthCard from "@/components/AuthCard/AuthCard.tsx";

import SignInForm from "@/pages/SignInPage/components/SignInForm/SignInForm.tsx";

import styles from "./SignInPage.module.css";

export default function SignInPage(): ReactNode {
  return (
    <div className={styles["sign-in-page"]}>
      <AuthCard
        page="sign-in"
        title="Welcome Back!"
        subtitle="Enter your credentials to sign in."
      >
        <SignInForm />
      </AuthCard>
    </div>
  );
}
