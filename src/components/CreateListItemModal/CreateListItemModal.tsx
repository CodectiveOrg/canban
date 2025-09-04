import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardContext } from "@/context/board-context.ts";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading" | "children"> & {
  listId: string;
};

export default function CreateListItemModal({
  ref,
  contentClassName,
  listId,
  ...otherProps
}: Props): ReactNode {
  const { create } = use(BoardContext);

  const [titleError, setTitleError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleModalClose = (): void => {
    setTitleError(null);
    formRef.current?.reset();
  };

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = globalThis.crypto.randomUUID();
    const title = formData.get("title") as string;

    if (!validateTitle(title)) {
      return;
    }

    create(listId, { id, title: title.trim() });
    toast.success("Item created successfully.");

    ref.current?.close();
  };

  const validateTitle = (title: unknown): boolean => {
    if (typeof title !== "string") {
      setTitleError("Title must be a string.");
      return false;
    }

    if (title.trim().length === 0) {
      setTitleError("Title cannot be empty.");
      return false;
    }

    setTitleError(null);
    return true;
  };

  return (
    <Modal
      ref={ref}
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      heading="Create a New Item"
      onClose={handleModalClose}
      {...otherProps}
    >
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <TextInput label="Title" type="text" name="title" error={titleError} />
        <div className={styles.actions}>
          <Button type="reset" onClick={handleCancelButtonClick}>
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
