import { type ComponentProps, type ReactNode, useId, useRef } from "react";

import clsx from "clsx";

import Avatar from "@/components/Avatar/Avatar.tsx";
import Button from "@/components/Button/Button.tsx";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line.tsx";

import styles from "./PictureInput.module.css";

type Props = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  hint: string;
  savedPicture: string | null;
  username: string;
  error?: string | null;
  onRemove: () => void;
};

export default function PictureInput({
  className,
  label,
  hint,
  savedPicture,
  username,
  error,
  onRemove,
  ...otherProps
}: Props): ReactNode {
  const id = useId();

  const ref = useRef<HTMLInputElement>(null);

  const openFilePicker = (): void => {
    ref.current?.click();
  };

  return (
    <div
      className={clsx(
        styles["picture-input"],
        !!error && styles.error,
        className,
      )}
    >
      <div className={styles["input-box"]}>
        <input ref={ref} id={id} type="file" {...otherProps} />
        <Avatar
          className={styles.avatar}
          picture={savedPicture}
          username={username}
          size={64}
        />
        <div className={styles.text}>
          <label htmlFor={id}>{label}</label>
          <div className={styles.hint}>{hint}</div>
        </div>
        <div className={styles.actions}>
          {savedPicture && (
            <Button
              type="button"
              variant="text"
              color="danger"
              onClick={onRemove}
            >
              <MingcuteDelete2Line />
            </Button>
          )}
          <Button type="button" variant="outlined" onClick={openFilePicker}>
            Upload
          </Button>
        </div>
      </div>
      <span className={styles.error}>{error || "\u00A0"}</span>
    </div>
  );
}
