import {
  type ComponentProps,
  type MouseEvent,
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
  onClick,
  ...otherProps
}: Props): ReactNode {
  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>): void => {
    if (e.target === e.currentTarget) {
      ref.current?.close();
    }

    onClick?.(e);
  };

  const handleCloseButtonClick = (): void => {
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className={clsx(styles.modal, className)}
      onClick={handleDialogClick}
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
