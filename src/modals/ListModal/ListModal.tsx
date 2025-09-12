import { type ComponentProps, type ReactNode, use } from "react";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TextInput from "@/components/TextInput/TextInput.tsx";

import { ListsContext } from "@/context/lists-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { ListSchema } from "@/schemas/list-schema.ts";

type Values = z.infer<typeof ListSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex?: number;
  defaultValues?: Values;
};

export default function ListModal({
  modalRef,
  listIndex,
  defaultValues,
}: Props): ReactNode {
  const { dispatchLists } = use(ListsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ListSchema),
  });

  const handleRemoveButtonClick = (): void => {
    if (listIndex === undefined) {
      return;
    }

    dispatchLists({ type: "list_removed", listIndex });
    toast.success("List removed successfully.");

    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {
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

  return (
    <FormModal
      modalRef={modalRef}
      heading={
        listIndex !== undefined ? "Edit Existing List" : "Create a New List"
      }
      onClose={() => reset()}
      onSubmit={handleSubmit(handleFormSubmit)}
      onRemove={listIndex !== undefined && handleRemoveButtonClick}
    >
      <TextInput
        {...register("title")}
        label="Title"
        type="text"
        error={errors.title?.message}
      />
    </FormModal>
  );
}
