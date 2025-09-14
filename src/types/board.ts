import type { ListType } from "@/types/list.ts";

export type BoardType = {
  id: string;
  title: string;
  description: string;
  color: BoardColor;
  lists: ListType[];
};

export const BOARD_COLORS = Object.freeze([
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "gray",
] as const);

export type BoardColor = (typeof BOARD_COLORS)[number];
