import { type ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";
import Logo from "@/components/Logo/Logo.tsx";
import SidebarGroups from "@/components/Sidebar/components/SidebarGroups/SidebarGroups.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";

import MingcuteArrowsRightLine from "@/icons/MingcuteArrowsRightLine.tsx";
import MingcuteExitLine from "@/icons/MingcuteExitLine.tsx";

import { useSidebarStore } from "@/stores/sidebar-store.ts";

import styles from "./Sidebar.module.css";

export default function Sidebar(): ReactNode {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const fold = useSidebarStore((state) => state.fold);

  return (
    <aside className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}>
      <div className={styles.header}>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        <IconButton className={styles.arrow} onClick={fold}>
          <MingcuteArrowsRightLine />
        </IconButton>
      </div>
      <nav>
        <SidebarGroups />
      </nav>
      <div className={styles.footer}>
        <SidebarItem
          id="sign-out"
          title="Sign Out"
          color="gray"
          icon={<MingcuteExitLine />}
        />
      </div>
    </aside>
  );
}
