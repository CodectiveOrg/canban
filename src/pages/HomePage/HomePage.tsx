import { type ReactNode, useRef } from "react";

import BoardCard from "@/components/BoardCard/BoardCard.tsx";
import Button from "@/components/Button/Button.tsx";

import BoardModal from "@/modals/BoardModal/BoardModal.tsx";

import { useKanbanStore } from "@/stores/kanban-store.ts";

import styles from "./HomePage.module.css";

export default function HomePage(): ReactNode {
  const boards = useKanbanStore((state) => state.boards);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCreateButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["home-page"]}>
      <div className={styles.header}>
        <h1>Boards</h1>
        <Button color="primary" onClick={handleCreateButtonClick}>
          Create
        </Button>
      </div>
      <ul className={styles.boards}>
        {boards.map((board) => (
          <li key={board.id}>
            <BoardCard board={board} />
          </li>
        ))}
      </ul>
      <BoardModal modalRef={modalRef} />
    </div>
  );
}
