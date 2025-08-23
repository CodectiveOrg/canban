import type { ListItemType } from "@/types/list-item.ts";

export type ListType = {
  id: string;
  title: string;
  items: ListItemType[];
};
