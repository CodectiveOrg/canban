import { type ComponentProps, type ReactNode, memo } from "react";

import clsx from "clsx";

import styles from "./IconButton.module.css";

type Props = ComponentProps<"button">;

const IconButton = memo(function IconButton({
  className,
  children,
  ...otherProps
}: Props): ReactNode {
  return (
    <button className={clsx(styles["icon-button"], className)} {...otherProps}>
      {children}
    </button>
  );
});

export default IconButton;
