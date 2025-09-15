import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Theme } from "@/types/theme.ts";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme",
      onRehydrateStorage: () => {
        return (state) => {
          document.documentElement.dataset.theme = state?.theme ?? "light";
        };
      },
    },
  ),
);

useThemeStore.subscribe((state) => {
  document.documentElement.dataset.theme = state.theme;
});
