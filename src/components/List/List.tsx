import { type ReactNode, useRef } from "react";

import CreateListItemModal from "@/components/CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  list: ListType;
};

export default function List({ list }: Props): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenButtonClick = (): void => {
    ref.current?.showModal();
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.actions}>
          <IconButton onClick={handleOpenButtonClick}>
            <MingcuteAddLine />
          </IconButton>
          <IconButton>
            <MingcuteMore1Line />
          </IconButton>
        </div>
      </div>
      <ul className={styles.items}>
        {list.items.map((item) => (
          <li key={item.id}>
            <ListItem listId={list.id} item={item} />
          </li>
        ))}
      </ul>
      <CreateListItemModal ref={ref} listId={list.id} />
    </div>
  );
}
