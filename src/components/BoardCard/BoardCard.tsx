import { type ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import BoardModal from "@/modals/BoardModal/BoardModal.tsx";

import { useModalStore } from "@/stores/modal-store.ts";

import type { BoardType } from "@/types/board.ts";

import styles from "./BoardCard.module.css";

type Props = {
  board: BoardType;
};

export default function BoardCard({ board }: Props): ReactNode {
  const showModal = useModalStore((state) => state.showModal);

  const handleEditButtonClick = (): void => {
    showModal(() => <BoardModal boardId={board.id} defaultValues={board} />);
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
    </div>
  );
}
