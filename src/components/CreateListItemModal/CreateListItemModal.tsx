import {
  type ChangeEvent,
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
  const { dispatchLists } = use(BoardContext);

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const shouldValidateOnChange = useRef<boolean>(false);

  const handleModalClose = (): void => {
    setTitleError(null);
    formRef.current?.reset();
  };

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormReset = (): void => {
    setTitle("");
    shouldValidateOnChange.current = false;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    shouldValidateOnChange.current = true;

    if (!validateTitle(title)) {
      return;
    }

    const id = globalThis.crypto.randomUUID();
    dispatchLists({ type: "created", listId, item: { id, title } });
    toast.success("Item created successfully.");

    ref.current?.close();
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();

    if (shouldValidateOnChange.current) {
      validateTitle(value);
    }

    setTitle(value);
  };

  const validateTitle = (title: string): boolean => {
    if (title.length === 0) {
      setTitleError("Title cannot be empty.");
      return false;
    }

    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters.");
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
      <form ref={formRef} onReset={handleFormReset} onSubmit={handleFormSubmit}>
        <TextInput
          label="Title"
          type="text"
          name="title"
          value={title}
          error={titleError}
          onChange={handleTitleChange}
        />
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
