import { type ReactNode, useCallback, useState } from "react";

import { listsData } from "@/data/lists-data.ts";

import Button from "@/components/Button/Button.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);

  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleListItemClick = useCallback(
    (listId: string, itemId: string): void => {
      setActiveListId(listId);
      setActiveItemId(itemId);
    },
    [],
  );

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          {activeListId !== null && (
            <div className={styles.spacer}>
              {lists
                .filter((list) => list.id !== activeListId)
                .map((list) => (
                  <Button key={list.id}>{list.title}</Button>
                ))}
              <Button>Remove</Button>
            </div>
          )}
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <li key={list.id}>
            <List list={list} onClick={handleListItemClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}
