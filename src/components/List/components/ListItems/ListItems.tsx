import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import ListItem from "@/components/ListItem/ListItem.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./ListItems.module.css";

type Props = {
  presentational?: boolean;
  listIndex: number;
  list: ListType;
};

export default function ListItems({
  presentational,
  listIndex,
  list,
}: Props): ReactNode {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  return (
    <SortableContext id={list.id} items={list.items.map((item) => item.id)}>
      <ul ref={setNodeRef} className={styles["list-items"]}>
        {list.items.map((item, itemIndex) => (
          <li key={item.id}>
            <ListItem
              presentational={presentational}
              listIndex={listIndex}
              itemIndex={itemIndex}
              item={item}
            />
          </li>
        ))}
      </ul>
    </SortableContext>
  );
}
