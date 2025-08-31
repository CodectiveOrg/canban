import type { ReactNode } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  list: ListType;
  onClick?: (listId: string, itemId: string) => void;
  onRemove?: (listId: string, itemId: string) => void;
};

export default function List({ list, onClick, onRemove }: Props): ReactNode {
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <IconButton>
          <MingcuteMore1Line />
        </IconButton>
      </div>
      <ul className={styles.items}>
        {list.items.map((item) => (
          <li key={item.id}>
            <ListItem
              listId={list.id}
              item={item}
              onClick={onClick}
              onRemove={onRemove}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
