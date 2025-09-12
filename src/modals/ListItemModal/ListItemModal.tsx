import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { toast } from "react-toastify";

import { z } from "zod";

import Button from "@/components/Button/Button.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { ListsContext } from "@/context/lists-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { ListItemSchema } from "@/schemas/list-item-schema.ts";

import type { ListItemType } from "@/types/list-item.ts";

type Values = Omit<ListItemType, "id">;
type Errors = { [key in keyof Values]?: string[] };

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
  const { dispatchLists } = use(ListsContext);

  const [errors, setErrors] = useState<Errors>({});

  const handleRemoveButtonClick = (): void => {
    if (itemIndex === undefined) {
      return;
    }

    dispatchLists({ type: "item_removed", listIndex, itemIndex });
    toast.success("Item removed successfully.");

    modalRef.current?.close();
  };

  const handleFormReset = (): void => {
    setErrors({});
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Values = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dueDate: formData.get("dueDate") as string,
    };

    const { data, error } = ListItemSchema.safeParse(values);
    if (error) {
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }

    if (itemIndex !== undefined) {
      dispatchLists({
        type: "item_edited",
        listIndex,
        itemIndex,
        item: data,
      });
      toast.success("Item edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "item_created",
        listIndex,
        item: { id, ...data },
      });
      toast.success("Item created successfully.");
    }

    modalRef.current?.close();
  };

  return (
    <FormModal
      modalRef={modalRef}
      heading={
        itemIndex !== undefined ? `Edit Exising Item` : "Create a New Item"
      }
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
      extraActions={
        itemIndex !== undefined && (
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
        error={errors.title?.[0]}
      />
      <TextArea
        label="Description"
        name="description"
        defaultValue={defaultValues?.description}
        error={errors.description?.[0]}
      />
      <TextInput
        label="Due Date"
        type="date"
        name="dueDate"
        defaultValue={defaultValues?.dueDate}
        error={errors.dueDate?.[0]}
      />
    </FormModal>
  );
}
