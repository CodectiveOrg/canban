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

  const handleMoveButtonClick = (destinationListId: string): void => {
    setLists((old) => {
      try {
        const activeListIndex = old.findIndex(
          (list) => list.id === activeListId,
        );
        const destinationListIndex = old.findIndex(
          (list) => list.id === destinationListId,
        );

        if (activeListIndex === -1 || destinationListIndex === -1) {
          console.error("Cannot find desired list.");
          return old;
        }

        const clone = [...old];
        const activeList = {
          ...clone[activeListIndex],
          items: [...clone[activeListIndex].items],
        };
        const destinationList = {
          ...clone[destinationListIndex],
          items: [...clone[destinationListIndex].items],
        };

        const activeItemIndex = activeList.items.findIndex(
          (item) => item.id === activeItemId,
        );

        if (activeItemIndex === -1) {
          console.error("Cannot find desired item.");
          return old;
        }

        const [activeItem] = activeList.items.splice(activeItemIndex, 1);
        destinationList.items.push(activeItem);

        clone[activeListIndex] = activeList;
        clone[destinationListIndex] = destinationList;
        return clone;
      } finally {
        setActiveListId(null);
        setActiveItemId(null);
      }
    });
  };

  const handleRemoveButtonClick = (): void => {
    setLists((old) => {
      try {
        const activeListIndex = old.findIndex(
          (list) => list.id === activeListId,
        );

        if (activeListIndex === -1) {
          console.error("Cannot find desired list.");
          return old;
        }

        const clone = [...old];
        const activeList = {
          ...clone[activeListIndex],
          items: [...clone[activeListIndex].items],
        };

        const activeItemIndex = activeList.items.findIndex(
          (item) => item.id === activeItemId,
        );

        if (activeItemIndex === -1) {
          console.error("Cannot find desired item.");
          return old;
        }

        activeList.items.splice(activeItemIndex, 1);

        clone[activeListIndex] = activeList;
        return clone;
      } finally {
        setActiveListId(null);
        setActiveItemId(null);
      }
    });
  };

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
                  <Button
                    key={list.id}
                    onClick={() => handleMoveButtonClick(list.id)}
                  >
                    {list.title}
                  </Button>
                ))}
              <Button onClick={handleRemoveButtonClick}>Remove</Button>
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
