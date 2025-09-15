import { type ReactNode } from "react";

import { SortableContext } from "@dnd-kit/sortable";

import List from "@/components/List/List.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./BoardLists.module.css";

type Props = {
  lists: ListType[];
};

export default function BoardLists({ lists }: Props): ReactNode {
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
