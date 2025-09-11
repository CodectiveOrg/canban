import { type MouseEvent, type ReactNode, useRef } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import ListItemModal from "@/modals/ListItemModal/ListItemModal.tsx";

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
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({
    id: item.id,
    data: { isList: false, listIndex, itemIndex, item },
  });

  const overListIndex = over?.data.current?.listIndex;

  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    modalRef.current?.showModal();
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={clsx(
          styles["list-item"],
          presentational && styles.presentational,
        )}
        style={{
          opacity: isDragging ? "0.5" : undefined,
          transform: CSS.Translate.toString(transform),
          transition: listIndex === overListIndex ? transition : undefined,
        }}
        {...listeners}
        {...attributes}
      >
        {item.title}
        <IconButton onPointerDown={handleEditButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
      </div>
      <ListItemModal
        modalRef={modalRef}
        listIndex={listIndex}
        itemIndex={itemIndex}
        defaultValues={item}
      />
    </>
  );
}
