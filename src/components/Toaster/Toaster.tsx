import type { ReactNode } from "react";

import { Slide, ToastContainer } from "react-toastify";

import { useThemeStore } from "@/stores/theme-store.ts";

export default function Toaster(): ReactNode {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      transition={Slide}
    />
  );
}
