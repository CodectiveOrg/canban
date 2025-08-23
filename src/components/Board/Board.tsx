import { type ReactNode, useState } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const [todoList] = useState<ListType>({
    id: "1",
    title: "🔜 To Do",
    items: [
      { id: "1", title: "Setup Backend Project" },
      { id: "2", title: "Find a Good Name for the Project" },
      { id: "3", title: "Implement Landing Page" },
    ],
  });

  const [doingList] = useState<ListType>({
    id: "2",
    title: "🔨 Doing",
    items: [
      { id: "4", title: "Setup Frontend Project" },
      { id: "5", title: "Design Landing Page" },
    ],
  });
  const [doneList] = useState<ListType>({
    id: "3",
    title: "🎉 Done",
    items: [],
  });

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        <li>
          <List list={todoList} />
        </li>
        <li>
          <List list={doingList} />
        </li>
        <li>
          <List list={doneList} />
        </li>
      </ul>
    </div>
  );
}
