import { type ReactNode, useRef } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteDotsLine from "@/icons/MingcuteDotsLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import ListItemModal from "@/modals/ListItemModal/ListItemModal.tsx";
import ListModal from "@/modals/ListModal/ListModal.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./ListHeader.module.css";

type Props = {
  listIndex: number;
  list: ListType;
  listeners?: SyntheticListenerMap;
};

export default function ListHeader({
  listIndex,
  list,
  listeners,
}: Props): ReactNode {
  const listModalRef = useRef<HTMLDialogElement>(null);
  const listItemModalRef = useRef<HTMLDialogElement>(null);

  const handleEditListButtonClick = (): void => {
    listModalRef.current?.showModal();
  };

  const handleCreateListItemButtonClick = (): void => {
    listItemModalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles["drag-handle"]} {...listeners}>
        <MingcuteDotsLine />
        <div className={styles.title}>{list.title}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleEditListButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListItemButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListModal
        modalRef={listModalRef}
        listIndex={listIndex}
        defaultValues={list}
      />
      <ListItemModal modalRef={listItemModalRef} listIndex={listIndex} />
    </div>
  );
}
