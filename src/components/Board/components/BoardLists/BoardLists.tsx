import { type ReactNode, use } from "react";

import { SortableContext } from "@dnd-kit/sortable";

import List from "@/components/List/List.tsx";

import { BoardContext } from "@/context/board-context.ts";

import styles from "./BoardLists.module.css";

export default function BoardLists(): ReactNode {
  const { lists } = use(BoardContext);

  return (
    <SortableContext id="board" items={lists.map((list) => list.id)}>
      <ul className={styles["board-lists"]}>
        {lists.map((list, listIndex) => (
          <li key={list.id}>
            <List listIndex={listIndex} list={list} />
          </li>
        ))}
      </ul>
    </SortableContext>
  );
}
