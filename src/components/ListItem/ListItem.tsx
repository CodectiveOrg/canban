import { type MouseEvent, type ReactNode, use } from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import { ActiveItemContext } from "@/context/active-item-context.ts";
import { BoardContext } from "@/context/board-context.ts";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line.tsx";

import type { ListItemType } from "@/types/list-item.ts";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
};

export default function ListItem({ listId, item }: Props): ReactNode {
  const { dispatchLists } = use(BoardContext);
  const { activeItemId, activate, deactivate } = use(ActiveItemContext);

  const handleListItemClick = (): void => {
    if (item.id === activeItemId) {
      deactivate();
    } else {
      activate(listId, item.id);
    }
  };

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    dispatchLists({ type: "removed", listId, itemId: item.id });
    toast.success("Item removed successfully.");

    deactivate();
  };

  return (
    <div
      className={clsx(
        styles["list-item"],
        item.id === activeItemId && styles.active,
      )}
      onClick={handleListItemClick}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
}
