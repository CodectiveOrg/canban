import { createContext } from "react";

type ContextValue = {
  isCollapsed: boolean;
};

export const SidebarContext = createContext<ContextValue>({} as ContextValue);
