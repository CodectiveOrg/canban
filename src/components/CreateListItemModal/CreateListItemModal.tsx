import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading" | "children">;

export default function CreateListItemModal({
  ref,
  contentClassName,
  ...otherProps
}: Props): ReactNode {
  return (
    <Modal
      ref={ref}
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      heading="Create a New Item"
      {...otherProps}
    >
      <form>
        <TextInput label="Title" />
        <div className={styles.actions}>
          <Button type="button">Cancel</Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
