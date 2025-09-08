import { type MouseEvent, type ReactNode, use } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { toast } from "react-toastify";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import { BoardContext } from "@/context/board-context.ts";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line.tsx";

import type { ListItemType } from "@/types/list-item.ts";

import styles from "./ListItem.module.css";

type Props = {
  presentational?: boolean;
  listIndex: number;
  itemIndex: number;
  item: ListItemType;
};

export default function ListItem({
  presentational,
  listIndex,
  itemIndex,
  item,
}: Props): ReactNode {
  const { dispatchLists } = use(BoardContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { isList: false, listIndex, itemIndex, item },
  });

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    dispatchLists({ type: "item_removed", listIndex, itemIndex });
    toast.success("Item removed successfully.");
  };

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        styles["list-item"],
        presentational && styles.presentational,
      )}
      style={{
        opacity: isDragging ? "0.5" : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...listeners}
      {...attributes}
    >
      {item.title}
      <IconButton onPointerDown={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
}
