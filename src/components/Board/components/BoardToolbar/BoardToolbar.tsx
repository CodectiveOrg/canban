import { type ReactNode, useRef } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import ListModal from "@/modals/ListModal/ListModal.tsx";

import styles from "./BoardToolbar.module.css";

export default function BoardToolbar(): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCreateListButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["board-toolbar"]}>
      <div className={styles.title}>Board Title</div>
      <div className={styles.actions}>
        <IconButton>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListModal modalRef={modalRef} />
    </div>
  );
}
