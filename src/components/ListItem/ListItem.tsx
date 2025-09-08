import { type MouseEvent, type ReactNode, use } from "react";

import { toast } from "react-toastify";

import IconButton from "@/components/IconButton/IconButton.tsx";

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

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    dispatchLists({ type: "removed", listId, itemId: item.id });
    toast.success("Item removed successfully.");
  };

  return (
    <div className={styles["list-item"]}>
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
}
