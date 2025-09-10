import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { toast } from "react-toastify";

import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardContext } from "@/context/board-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import type { ListType } from "@/types/list.ts";

type Values = Omit<ListType, "id" | "items">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {};

export default function ListModal({ modalRef }: Props): ReactNode {
  const { dispatchLists } = use(BoardContext);

  const [titleError, setTitleError] = useState<string | null>(null);

  const handleFormReset = (): void => {
    setTitleError(null);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Values = {
      title: formData.get("title") as string,
    };

    if (!validateTitle(values.title)) {
      return;
    }

    const id = globalThis.crypto.randomUUID();
    dispatchLists({ type: "list_created", list: { id, items: [], ...values } });
    toast.success("List created successfully.");

    modalRef.current?.close();
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
    <FormModal
      modalRef={modalRef}
      heading="Create a New List"
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <TextInput label="Title" type="text" name="title" error={titleError} />
    </FormModal>
  );
}
