import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  isCollapsed: boolean;
  fold: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      fold: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    { name: "sidebar" },
  ),
);
