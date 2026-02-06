import type { ReactNode } from "react";

import { create } from "zustand";

type RenderModal = () => ReactNode;

type ModalState = {
  renderModal: RenderModal | null;
  showModal: (renderModal: RenderModal) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>()((set) => ({
  renderModal: null,
  showModal: (renderModal) => set(() => ({ renderModal })),
  closeModal: () => set(() => ({ renderModal: null })),
}));
