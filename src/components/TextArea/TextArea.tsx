import { type ComponentProps, type ReactNode, useId } from "react";

import clsx from "clsx";

import styles from "./TextArea.module.css";

type Props = ComponentProps<"textarea"> & {
  label: string;
  error?: string | null;
};

export default function TextArea({
  className,
  label,
  error,
  ...otherProps
}: Props): ReactNode {
  const id = useId();

  return (
    <div
      className={clsx(styles["text-area"], !!error && styles.error, className)}
    >
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...otherProps} />
      <span className={styles.error}>{error || "\u00A0"}</span>
    </div>
  );
}
