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
import TextInput from "@/components/TextInput/TextInput.tsx";

import { ListsContext } from "@/context/lists-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { ListSchema } from "@/schemas/list-schema.ts";

import type { ListType } from "@/types/list.ts";

type Values = Omit<ListType, "id" | "items">;
type Errors = { [key in keyof Values]?: string[] };

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

  const [errors, setErrors] = useState<Errors>({});

  const handleRemoveButtonClick = (): void => {
    if (listIndex === undefined) {
      return;
    }

    dispatchLists({ type: "list_removed", listIndex });
    toast.success("List removed successfully.");

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
    };

    const { data, error } = ListSchema.safeParse(values);
    if (error) {
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }

    if (listIndex !== undefined) {
      dispatchLists({ type: "list_edited", listIndex, list: data });
      toast.success("List edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "list_created",
        list: { id, items: [], ...data },
      });
      toast.success("List created successfully.");
    }

    modalRef.current?.close();
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
        error={errors.title?.[0]}
      />
    </FormModal>
  );
}
