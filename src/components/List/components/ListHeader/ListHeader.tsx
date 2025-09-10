import { type ReactNode, useRef } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import ListItemModal from "@/modals/ListItemModal/ListItemModal.tsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteDotsLine from "@/icons/MingcuteDotsLine.tsx";
import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import styles from "./ListHeader.module.css";

type Props = {
  title: string;
  listIndex: number;
  listeners?: SyntheticListenerMap;
};

export default function ListHeader({
  title,
  listIndex,
  listeners,
}: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCreateButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles["drag-handle"]} {...listeners}>
        <MingcuteDotsLine />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleCreateButtonClick}>
          <MingcuteAddLine />
        </IconButton>
        <IconButton>
          <MingcuteMore1Line />
        </IconButton>
      </div>
      <ListItemModal modalRef={modalRef} listIndex={listIndex} />
    </div>
  );
}
