import { type ReactNode, useRef } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import BoardModal from "@/modals/BoardModal/BoardModal.tsx";

import type { BoardType } from "@/types/board.ts";

import styles from "./BoardCard.module.css";

type Props = {
  board: BoardType;
};

export default function BoardCard({ board }: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleEditButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={clsx(styles["board-card"], board.color)}>
      <div className={styles.cover}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link className={styles.title} to={`/board/${board.id}`}>
            {board.title}
          </Link>
          <IconButton onClick={handleEditButtonClick}>
            <MingcuteEdit2Line />
          </IconButton>
        </div>
        <p className={styles.description}>{board.description}</p>
      </div>
      <BoardModal
        modalRef={modalRef}
        boardId={board.id}
        defaultValues={board}
      />
    </div>
  );
}
