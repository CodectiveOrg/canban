import { create } from "zustand";

type SidebarStore = {
  isCollapsed: boolean;
  fold: () => void;
};

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isCollapsed: false,
  fold: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
