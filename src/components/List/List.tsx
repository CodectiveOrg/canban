import { type ReactNode, memo } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  list: ListType;
  onClick?: (id: string) => void;
};

const List = memo(function List({ list, onClick }: Props): ReactNode {
  console.log(list.title);

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
            <ListItem item={item} onClick={onClick} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default List;
