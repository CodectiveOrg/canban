import { type ReactNode } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line.tsx";

import BoardModal from "@/modals/BoardModal/BoardModal.tsx";
import ListModal from "@/modals/ListModal/ListModal.tsx";

import { useModalStore } from "@/stores/modal-store.ts";

import type { BoardType } from "@/types/board.ts";

import styles from "./BoardToolbar.module.css";

type Props = {
  board: BoardType;
};

export default function BoardToolbar({ board }: Props): ReactNode {
  const showModal = useModalStore((state) => state.showModal);

  const handleEditBoardButtonClick = (): void => {
    showModal(() => <BoardModal boardId={board.id} defaultValues={board} />);
  };

  const handleCreateListButtonClick = (): void => {
    showModal(() => <ListModal />);
  };

  return (
    <div className={styles["board-toolbar"]}>
      <div className={styles.title}>{board.title}</div>
      <div className={styles.actions}>
        <IconButton onClick={handleEditBoardButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
    </div>
  );
}
