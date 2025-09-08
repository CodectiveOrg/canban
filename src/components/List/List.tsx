import { type ReactNode, useRef } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import CreateListItemModal from "@/components/CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  listIndex: number;
  list: ListType;
};

export default function List({ listIndex, list }: Props): ReactNode {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.actions}>
          <IconButton onClick={handleClickButtonClick}>
            <MingcuteAddLine />
          </IconButton>
          <IconButton>
            <MingcuteMore1Line />
          </IconButton>
        </div>
      </div>
      <SortableContext id={list.id} items={list.items.map((item) => item.id)}>
        <ul ref={setNodeRef} className={styles.items}>
          {list.items.map((item, itemIndex) => (
            <li key={item.id}>
              <ListItem
                listIndex={listIndex}
                itemIndex={itemIndex}
                item={item}
              />
            </li>
          ))}
        </ul>
      </SortableContext>
      <CreateListItemModal ref={modalRef} listIndex={listIndex} />
    </div>
  );
}
