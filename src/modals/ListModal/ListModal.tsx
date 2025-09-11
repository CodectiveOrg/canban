import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { toast } from "react-toastify";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { ListsContext } from "@/context/lists-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import type { ListType } from "@/types/list.ts";

type Values = Omit<ListType, "id" | "items">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex?: number;
  defaultValues?: Partial<Values>;
};

export default function ListModal({
  modalRef,
  listIndex,
  defaultValues,
}: Props): ReactNode {
  const { dispatchLists } = use(ListsContext);

  const [titleError, setTitleError] = useState<string | null>(null);

  const handleRemoveButtonClick = (): void => {
    if (listIndex === undefined) {
      return;
    }

    dispatchLists({ type: "list_removed", listIndex });
    toast.success("List removed successfully.");

    modalRef.current?.close();
  };

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

    if (listIndex !== undefined) {
      dispatchLists({ type: "list_edited", listIndex, list: values });
      toast.success("List edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "list_created",
        list: { id, items: [], ...values },
      });
      toast.success("List created successfully.");
    }

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
      heading={
        listIndex !== undefined ? "Edit Existing List" : "Create a New List"
      }
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
      extraActions={
        listIndex !== undefined && (
          <Button
            type="button"
            variant="text"
            color="danger"
            onClick={handleRemoveButtonClick}
          >
            Remove
          </Button>
        )
      }
    >
      <TextInput
        label="Title"
        type="text"
        name="title"
        defaultValue={defaultValues?.title}
        error={titleError}
      />
    </FormModal>
  );
}
