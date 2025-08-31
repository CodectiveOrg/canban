import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./IconButton.module.css";

type Props = ComponentProps<"button">;

export default function IconButton({
  className,
  children,
  ...otherProps
}: Props): ReactNode {
  return (
    <button className={clsx(styles["icon-button"], className)} {...otherProps}>
      {children}
    </button>
  );
}
