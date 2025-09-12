import { type ComponentProps, type ReactNode, use } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardsContext } from "@/context/boards-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { BoardSchema } from "@/schemas/board-schema.ts";

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
  const { dispatchBoards } = use(BoardsContext);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(BoardSchema),
  });

  const handleRemoveButtonClick = (): void => {
    if (boardId === undefined) {
      return;
    }

    dispatchBoards({ type: "board_removed", boardId });
    toast.success("Board removed successfully.");

    modalRef.current?.close();

    navigate("/");
  };

  const handleFormSubmit = (values: Values): void => {
    if (boardId !== undefined) {
      dispatchBoards({ type: "board_edited", boardId, board: values });
      toast.success("Board edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchBoards({
        type: "board_created",
        board: { id, lists: [], ...values },
      });
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
