import { type ComponentProps, type ReactNode, use } from "react";

import clsx from "clsx";

import Initials from "@/components/Initials/Initials.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";
import { SidebarContext } from "@/components/Sidebar/context/sidebar-context.ts";

import { BoardsContext } from "@/context/boards-context.ts";

import MingcuteHome7Line from "@/icons/MingcuteHome7Line.tsx";
import MingcuteSettings5Line from "@/icons/MingcuteSettings5Line.tsx";

import styles from "./SidebarGroups.module.css";

type SidebarGroup = {
  title?: string;
  items: ComponentProps<typeof SidebarItem>[];
};

export default function SidebarGroups(): ReactNode {
  const { boards } = use(BoardsContext);
  const { isCollapsed } = use(SidebarContext);

  const groups: SidebarGroup[] = [
    {
      items: [
        {
          href: "/",
          title: "Home",
          color: "gray",
          icon: <MingcuteHome7Line />,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          href: "/settings",
          title: "Settings",
          color: "gray",
          icon: <MingcuteSettings5Line />,
        },
      ],
    },
    {
      title: "Boards",
      items: boards.map((board) => ({
        href: `/board/${board.id}`,
        title: board.title,
        color: board.color,
        icon: <Initials title={board.title} color={board.color} />,
      })),
    },
  ];

  return groups.map((group, groupIndex) => (
    <div
      key={groupIndex}
      className={clsx(styles.group, isCollapsed && styles.collapsed)}
    >
      {group.title && (
        <div className={styles.title}>
          {isCollapsed ? group.title[0] : group.title}
        </div>
      )}
      <ul>
        {group.items.map((item) => (
          <li key={item.href}>
            <SidebarItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  ));
}
