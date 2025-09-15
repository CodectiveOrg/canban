import { type ComponentProps, type ReactNode } from "react";

import { useParams } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TextInput from "@/components/TextInput/TextInput.tsx";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { ListSchema } from "@/schemas/list-schema.ts";

import { useKanbanStore } from "@/stores/kanban-store.ts";

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
  const { boardId } = useParams();

  const createList = useKanbanStore((state) => state.createList);
  const editList = useKanbanStore((state) => state.editList);
  const removeList = useKanbanStore((state) => state.removeList);

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

    removeList(boardId, listIndex);
    toast.success("List removed successfully.");

    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {
    if (listIndex !== undefined) {
      editList(boardId, listIndex, values);
      toast.success("List edited successfully.");
    } else {
      createList(boardId, values);
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
      onRemove={listIndex !== undefined && handleRemoveButtonClick}
      onSubmit={handleSubmit(handleFormSubmit)}
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
