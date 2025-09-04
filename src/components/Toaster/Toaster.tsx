import type { ReactNode } from "react";

import { Slide, ToastContainer } from "react-toastify";

export default function Toaster(): ReactNode {
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
      theme="light"
      transition={Slide}
    />
  );
}
