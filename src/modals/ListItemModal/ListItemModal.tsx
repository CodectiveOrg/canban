import { type ReactNode } from "react";

import { useParams } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { ListItemSchema } from "@/schemas/list-item-schema.ts";

import { useKanbanStore } from "@/stores/kanban-store.ts";
import { useModalStore } from "@/stores/modal-store.ts";

type Values = z.infer<typeof ListItemSchema>;

type Props = {
  listIndex: number;
  itemIndex?: number;
  defaultValues?: Values;
};

export default function ListItemModal({
  listIndex,
  itemIndex,
  defaultValues,
}: Props): ReactNode {
  const { boardId } = useParams();

  const closeModal = useModalStore((state) => state.closeModal);

  const createItem = useKanbanStore((state) => state.createItem);
  const editItem = useKanbanStore((state) => state.editItem);
  const removeItem = useKanbanStore((state) => state.removeItem);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ListItemSchema),
  });

  const handleRemoveButtonClick = (): void => {
    if (itemIndex === undefined) {
      return;
    }

    removeItem(boardId, listIndex, itemIndex);
    toast.success("Item removed successfully.");

    closeModal();
  };

  const handleFormSubmit = (values: Values): void => {
    if (itemIndex !== undefined) {
      editItem(boardId, listIndex, itemIndex, values);
      toast.success("Item edited successfully.");
    } else {
      createItem(boardId, listIndex, values);
      toast.success("Item created successfully.");
    }

    closeModal();
  };

  return (
    <FormModal
      heading={
        itemIndex !== undefined ? `Edit Exising Item` : "Create a New Item"
      }
      onClose={() => reset()}
      onRemove={itemIndex !== undefined && handleRemoveButtonClick}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextInput
        {...register("title")}
        label="Title"
        type="text"
        error={errors.title?.message}
      />
      <TextArea
        {...register("description")}
        label="Description"
        error={errors.description?.message}
      />
      <TextInput
        {...register("dueDate")}
        label="Due Date"
        type="date"
        error={errors.dueDate?.message}
      />
    </FormModal>
  );
}
