import { type ComponentProps, type ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { BoardSchema } from "@/schemas/board-schema.ts";

import { useKanbanStore } from "@/stores/kanban-store.ts";

type Values = z.infer<typeof BoardSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  boardId?: string;
  defaultValues?: Values;
};

export default function BoardModal({
  modalRef,
  boardId,
  defaultValues,
}: Props): ReactNode {
  const createBoard = useKanbanStore((state) => state.createBoard);
  const editBoard = useKanbanStore((state) => state.editBoard);
  const removeBoard = useKanbanStore((state) => state.removeBoard);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues ?? { color: "blue" },
    resolver: zodResolver(BoardSchema),
  });

  const handleRemoveButtonClick = (): void => {
    if (boardId === undefined) {
      return;
    }

    removeBoard(boardId);
    toast.success("Board removed successfully.");

    modalRef.current?.close();

    navigate("/");
  };

  const handleFormSubmit = (values: Values): void => {
    if (boardId !== undefined) {
      editBoard(boardId, values);
      toast.success("Board edited successfully.");
    } else {
      createBoard(values);
      toast.success("Board created successfully.");
    }

    modalRef.current?.close();
  };

  return (
    <FormModal
      modalRef={modalRef}
      heading={
        boardId !== undefined ? "Edit Existing Board" : "Create a New Board"
      }
      onClose={() => reset()}
      onRemove={boardId !== undefined && handleRemoveButtonClick}
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
      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <ColorInput {...field} label="Color" error={errors.color?.message} />
        )}
      />
    </FormModal>
  );
}
