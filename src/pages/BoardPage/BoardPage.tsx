import { type ReactNode } from "react";

import { useParams } from "react-router";

import Board from "@/components/Board/Board.tsx";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";

import DndProvider from "@/providers/DndProvider/DndProvider.tsx";

import { useKanbanStore } from "@/stores/kanban-store.ts";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const { boardId } = useParams();

  const boards = useKanbanStore((state) => state.boards);

  const board = boards.find((board) => board.id === boardId);

  if (!board) {
    return <NotFoundPage />;
  }

  return (
    <DndProvider>
      <div className={styles["board-page"]}>
        <Board board={board} />
      </div>
    </DndProvider>
  );
}
