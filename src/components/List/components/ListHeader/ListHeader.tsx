import { type ReactNode, useRef } from "react";

import CreateListItemModal from "@/components/CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import styles from "./ListHeader.module.css";

type Props = {
  title: string;
  listIndex: number;
};

export default function ListHeader({ title, listIndex }: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles.title}>{title}</div>
      <div className={styles.actions}>
        <IconButton onClick={handleClickButtonClick}>
          <MingcuteAddLine />
        </IconButton>
        <IconButton>
          <MingcuteMore1Line />
        </IconButton>
      </div>
      <CreateListItemModal ref={modalRef} listIndex={listIndex} />
    </div>
  );
}
