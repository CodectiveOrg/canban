import { type ReactNode, useState } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";
import SidebarGroups from "@/components/Sidebar/components/SidebarGroups/SidebarGroups.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";
import { SidebarContext } from "@/components/Sidebar/context/sidebar-context.ts";

import MingcuteArrowsRightLine from "@/icons/MingcuteArrowsRightLine.tsx";
import MingcuteExitLine from "@/icons/MingcuteExitLine.tsx";

import styles from "./Sidebar.module.css";

export default function Sidebar(): ReactNode {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleArrowClick = (): void => {
    setIsCollapsed((old) => !old);
  };

  return (
    <SidebarContext value={{ isCollapsed }}>
      <aside className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}>
        <div className={styles.header}>
          <Link className={styles.logo} to="/">
            <img
              src={isCollapsed ? "/favicon.svg" : "/logo.svg"}
              alt="Canban Logo"
            />
          </Link>
          <IconButton className={styles.arrow} onClick={handleArrowClick}>
            <MingcuteArrowsRightLine />
          </IconButton>
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
    </SidebarContext>
  );
}
