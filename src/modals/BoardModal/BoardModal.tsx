import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { z } from "zod";

import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardsContext } from "@/context/boards-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import { BoardSchema } from "@/schemas/board-schema.ts";

import type { BoardColor, BoardType } from "@/types/board.ts";

type Values = Omit<BoardType, "id" | "lists">;
type Errors = { [key in keyof Values]?: string[] };

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  boardId?: string;
  defaultValues?: Partial<Values>;
};

export default function BoardModal({
  modalRef,
  boardId,
  defaultValues,
}: Props): ReactNode {
  const { dispatchBoards } = use(BoardsContext);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});

  const handleRemoveButtonClick = (): void => {
    if (boardId === undefined) {
      return;
    }

    dispatchBoards({ type: "board_removed", boardId });
    toast.success("Board removed successfully.");

    modalRef.current?.close();

    navigate("/");
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
      color: formData.get("color") as BoardColor,
    };

    const { data, error } = BoardSchema.safeParse(values);
    if (error) {
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }

    if (boardId !== undefined) {
      dispatchBoards({ type: "board_edited", boardId, board: data });
      toast.success("Board edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchBoards({
        type: "board_created",
        board: { id, lists: [], ...data },
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
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
      onRemove={boardId !== undefined && handleRemoveButtonClick}
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
      <ColorInput
        label="Color"
        name="color"
        defaultValue={defaultValues?.color}
        error={errors.color?.[0]}
      />
    </FormModal>
  );
}
