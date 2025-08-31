import { type ReactNode, useContext, useEffect, useState } from "react";

import Button from "@/components/Button/Button.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import { BoardContext } from "@/context/board-context.ts";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const { lists, create, move } = useContext(BoardContext);

  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent): void => {
      if (e.code !== "Escape") {
        return;
      }

      setActiveListId(null);
      setActiveItemId(null);
    };

    document.addEventListener("keydown", handleDocumentKeyDown);

    return (): void => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);

  const handleListItemClick = (listId: string, itemId: string): void => {
    setActiveListId(listId);
    setActiveItemId(itemId);
  };

  const handleCreateButtonClick = (): void => {
    create();
  };

  const handleMoveButtonClick = (toListId: string): void => {
    if (activeListId && activeItemId) {
      move(activeListId, activeItemId, toListId);
    }

    setActiveListId(null);
    setActiveItemId(null);
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
            </div>
          )}
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton onClick={handleCreateButtonClick}>
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
