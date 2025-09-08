import { type ReactNode } from "react";

import ListHeader from "@/components/List/components/ListHeader/ListHeader.tsx";
import ListItems from "@/components/List/components/ListItems/ListItems.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./List.module.css";

type Props = {
  listIndex: number;
  list: ListType;
};

export default function List({ listIndex, list }: Props): ReactNode {
  return (
    <div className={styles.list}>
      <ListHeader title={list.title} listIndex={listIndex} />
      <ListItems listIndex={listIndex} list={list} />
    </div>
  );
}
