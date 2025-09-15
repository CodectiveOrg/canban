import { type ComponentProps, type ReactNode, use } from "react";

import clsx from "clsx";

import Initials from "@/components/Initials/Initials.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";
import ThemeSwitch from "@/components/Sidebar/components/ThemeSwitch/ThemeSwitch.tsx";

import { BoardsContext } from "@/context/boards-context.ts";

import MingcuteHome7Line from "@/icons/MingcuteHome7Line.tsx";
import MingcuteMoonStarsLine from "@/icons/MingcuteMoonStarsLine.tsx";
import MingcuteSettings5Line from "@/icons/MingcuteSettings5Line.tsx";

import { useSidebarStore } from "@/stores/sidebar-store.ts";
import { useThemeStore } from "@/stores/theme-store.ts";

import styles from "./SidebarGroups.module.css";

type SidebarGroup = {
  title?: string;
  items: ComponentProps<typeof SidebarItem>[];
};

export default function SidebarGroups(): ReactNode {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const { boards } = use(BoardsContext);

  const groups: SidebarGroup[] = [
    {
      items: [
        {
          id: "home",
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
          id: "settings",
          href: "/settings",
          title: "Settings",
          color: "gray",
          icon: <MingcuteSettings5Line />,
        },
        {
          id: "theme",
          title: <ThemeSwitch />,
          color: "gray",
          icon: <MingcuteMoonStarsLine />,
          onClick: toggleTheme,
        },
      ],
    },
    {
      title: "Boards",
      items: boards.map((board) => ({
        id: board.id,
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
          <li key={item.id}>
            <SidebarItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  ));
}
