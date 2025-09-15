import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarStore = {
  isCollapsed: boolean;
  fold: () => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      fold: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    { name: "sidebar" },
  ),
);
