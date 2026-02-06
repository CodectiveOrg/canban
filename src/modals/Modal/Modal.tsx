import {
  type ComponentProps,
  type PointerEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteCloseLine from "@/icons/MingcuteCloseLine.tsx";

import { useModalStore } from "@/stores/modal-store.ts";

import styles from "./Modal.module.css";

type Props = ComponentProps<"dialog"> & {
  contentClassName?: string;
  heading: string;
};

export default function Modal({
  className,
  contentClassName,
  heading,
  children,
  onPointerDown,
  ...otherProps
}: Props): ReactNode {
  const closeModal = useModalStore((state) => state.closeModal);

  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    ref.current?.showModal();
  }, []);

  const handleDialogPointerDown = (
    e: PointerEvent<HTMLDialogElement>,
  ): void => {
    if (e.target === e.currentTarget) {
      closeModal();
    } else {
      onPointerDown?.(e);
    }
  };

  const handleCloseButtonClick = (): void => {
    closeModal();
  };

  return (
    <dialog
      ref={ref}
      className={clsx(styles.modal, className)}
      onPointerDown={handleDialogPointerDown}
      {...otherProps}
    >
      <header>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.actions}>
          <IconButton onClick={handleCloseButtonClick}>
            <MingcuteCloseLine />
          </IconButton>
        </div>
      </header>
      <main className={contentClassName}>{children}</main>
    </dialog>
  );
}
