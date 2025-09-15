import { type ReactNode } from "react";

import { NavLink } from "react-router";

import clsx from "clsx";

import { useSidebarStore } from "@/stores/sidebar-store.ts";

import type { BoardColor } from "@/types/board.ts";

import styles from "./SidebarItem.module.css";

type Props = {
  id: string;
  href?: string;
  title: ReactNode;
  color: BoardColor;
  icon: ReactNode;
  onClick?: () => void;
};

export default function SidebarItem({
  href,
  title,
  color,
  icon,
  onClick,
}: Props): ReactNode {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  const className = clsx(
    styles["sidebar-item"],
    color,
    isCollapsed && styles.collapsed,
  );

  const children = (
    <>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.title}>{title}</span>
    </>
  );

  if (!href) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) => clsx(className, isActive && styles.active)}
    >
      {children}
    </NavLink>
  );
}
