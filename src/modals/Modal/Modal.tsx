import {
  type ComponentProps,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteCloseLine from "@/icons/MingcuteCloseLine.tsx";

import styles from "./Modal.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  contentClassName?: string;
  heading: string;
};

export default function Modal({
  ref,
  className,
  contentClassName,
  heading,
  children,
  onPointerDown,
  ...otherProps
}: Props): ReactNode {
  const handleDialogPointerDown = (
    e: PointerEvent<HTMLDialogElement>,
  ): void => {
    if (e.target === e.currentTarget) {
      ref.current?.close();
    } else {
      onPointerDown?.(e);
    }
  };

  const handleCloseButtonClick = (): void => {
    ref.current?.close();
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
