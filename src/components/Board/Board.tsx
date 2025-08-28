import { type ReactNode, useMemo, useState } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListItemType } from "@/types/list-item.ts";
import type { ListType } from "@/types/list.ts";

import styles from "./Board.module.css";

function cb(a: ListItemType, b: ListItemType): number {
  return a.title.localeCompare(b.title);
}

export default function Board(): ReactNode {
  const [todoList, setTodoList] = useState<ListType>({
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

  const handleEditButtonClick = (): void => {
    setTodoList((old) => {
      const clone = [...old.items];
      clone.splice(1, 1);
      return { ...old, items: clone };
    });
  };

  const sortedTodoList = useMemo(() => {
    return { ...todoList, items: [...todoList.items].sort(cb) };
  }, [todoList]);

  const sortedDoingList = useMemo(() => {
    return { ...doingList, items: [...doingList.items].sort(cb) };
  }, [doingList]);

  const sortedDoneList = useMemo(() => {
    return { ...doneList, items: [...doneList.items].sort(cb) };
  }, [doneList]);

  const [, setCounter] = useState(0);

  const result = useMemo(() => {
    return (todoList.items.length * 1020893 * 872478) / 827649824;
  }, [todoList.items.length]);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          <IconButton onClick={handleEditButtonClick}>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton onClick={() => setCounter((old) => old + 1)}>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        <li>
          <List list={sortedTodoList} />
        </li>
        <li>
          <List list={sortedDoingList} />
        </li>
        <li>
          <List list={sortedDoneList} />
        </li>
      </ul>
    </div>
  );
}
