import type { ReactNode } from "react";

import AuthCard from "@/components/AuthCard/AuthCard.tsx";
import Divider from "@/components/Divider/Divider.tsx";
import RandomButton from "@/components/RandomButton/RandomButton.tsx";

import SignUpForm from "@/pages/SignUpPage/components/SignUpForm/SignUpForm.tsx";

import styles from "./SignUpPage.module.css";

export default function SignUpPage(): ReactNode {
  return (
    <div className={styles["sign-up-page"]}>
      <AuthCard
        page="sign-up"
        title="Nice to Meet You!"
        subtitle="Use a random account or create a new one."
      >
        <RandomButton />
        <Divider>or</Divider>
        <SignUpForm />
      </AuthCard>
    </div>
  );
}
