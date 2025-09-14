import type { ReactNode } from "react";

import { Link } from "react-router";

import SidebarGroups from "@/components/Sidebar/components/SidebarGroups/SidebarGroups.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";

import MingcuteExitLine from "@/icons/MingcuteExitLine.tsx";

import styles from "./Sidebar.module.css";

export default function Sidebar(): ReactNode {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Link className={styles.logo} to="/">
          <img src="/logo.svg" alt="Canban Logo" />
        </Link>
      </div>
      <nav>
        <SidebarGroups />
      </nav>
      <div className={styles.footer}>
        <SidebarItem
          title="Sign Out"
          color="gray"
          icon={<MingcuteExitLine />}
        />
      </div>
    </aside>
  );
}
