import { type ReactNode, useCallback, useState } from "react";

import { listsData } from "@/data/lists-data.ts";

import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);

  const handleListItemClick = useCallback((id: string): void => {
    setLists((old) => {
      const clone = {
        ...old[0],
        items: [...old[0].items].filter((item) => item.id !== id),
      };

      return [clone, old[1], old[2]];
    });
  }, []);

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
          <List list={lists[0]} onClick={handleListItemClick} />
        </li>
        <li>
          <List list={lists[1]} />
        </li>
        <li>
          <List list={lists[2]} />
        </li>
      </ul>
    </div>
  );
}
