import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { toast } from "react-toastify";

import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardContext } from "@/context/board-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import type { ListItemType } from "@/types/list-item.ts";

type Values = Omit<ListItemType, "id">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex: number;
  itemIndex?: number;
  defaultValues?: Partial<Values>;
};

export default function ListItemModal({
  modalRef,
  listIndex,
  itemIndex,
  defaultValues,
}: Props): ReactNode {
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
      description: formData.get("description") as string,
      dueDate: formData.get("dueDate") as string,
    };

    if (!validateTitle(values.title)) {
      return;
    }

    if (itemIndex !== undefined) {
      dispatchLists({
        type: "item_edited",
        listIndex,
        itemIndex,
        item: values,
      });
      toast.success("Item edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "item_created",
        listIndex,
        item: { id, ...values },
      });
      toast.success("Item created successfully.");
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
        itemIndex === undefined ? `Edit Exising Item` : "Create a New Item"
      }
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <TextInput
        label="Title"
        type="text"
        name="title"
        defaultValue={defaultValues?.title}
        error={titleError}
      />
      <TextArea
        label="Description"
        name="description"
        defaultValue={defaultValues?.description}
      />
      <TextInput
        label="Due Date"
        type="date"
        name="dueDate"
        defaultValue={defaultValues?.dueDate}
      />
    </FormModal>
  );
}
