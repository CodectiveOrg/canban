import { type ReactNode, memo } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import MingcuteMore1Line from "@/icons/MingcuteMore1Line.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  list: ListType;
};

const List = memo(
  function List({ list }: Props): ReactNode {
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
              <ListItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  },
  (prev, next) => {
    if (prev.list.items.length !== next.list.items.length) {
      return false;
    }

    for (let i = 0; i < prev.list.items.length; i++) {
      if (prev.list.items[i].title !== next.list.items[i].title) {
        return false;
      }
    }

    return true;
  },
);

export default List;
