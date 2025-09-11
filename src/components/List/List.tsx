import { type ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ListHeader from "@/components/List/components/ListHeader/ListHeader.tsx";
import ListItems from "@/components/List/components/ListItems/ListItems.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  presentational?: boolean;
  listIndex: number;
  list: ListType;
};

export default function List({
  presentational,
  listIndex,
  list,
}: Props): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { isList: true, listIndex, list } });

  return (
    <div
      ref={setNodeRef}
      className={styles.list}
      style={{
        opacity: isDragging ? "0.5" : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <ListHeader listIndex={listIndex} list={list} listeners={listeners} />
      <ListItems
        presentational={presentational}
        listIndex={listIndex}
        list={list}
      />
    </div>
  );
}
