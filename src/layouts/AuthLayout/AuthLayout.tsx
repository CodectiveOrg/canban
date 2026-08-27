import type { ReactNode } from "react";

import { Outlet } from "react-router";

import Footer from "@/components/Footer/Footer.tsx";

import styles from "./AuthLayout.module.css";

export default function AuthLayout(): ReactNode {
  return (
    <div className={styles["auth-layout"]}>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
