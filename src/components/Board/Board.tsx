import { type ReactNode, use } from "react";

import { toast } from "react-toastify";

import Button from "@/components/Button/Button.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import List from "@/components/List/List.tsx";

import { ActiveItemContext } from "@/context/active-item-context.ts";
import { BoardContext } from "@/context/board-context.ts";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import styles from "./Board.module.css";

export default function Board(): ReactNode {
  const { lists, create, move } = use(BoardContext);

  const { activeListId, activeItemId, deactivate } = use(ActiveItemContext);

  const handleCreateButtonClick = (): void => {
    create();
    toast.success("Item created successfully.");
  };

  const handleMoveButtonClick = (toListId: string): void => {
    if (activeListId && activeItemId) {
      move(activeListId, activeItemId, toListId);
      toast.success("Item moved successfully.");
    }

    deactivate();
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
            <List list={list} />
          </li>
        ))}
      </ul>
    </div>
  );
}
