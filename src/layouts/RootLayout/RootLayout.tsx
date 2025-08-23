import type { ReactNode } from "react";

import { Outlet } from "react-router";

import Footer from "@/components/Footer/Footer.tsx";
import Header from "@/components/Header/Header.tsx";

import styles from "./RootLayout.module.css";

export default function RootLayout(): ReactNode {
  return (
    <div className={styles["root-layout"]}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
