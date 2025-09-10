import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  use,
  useState,
} from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import Button from "@/components/Button/Button.tsx";
import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { BoardsContext } from "@/context/boards-context.ts";

import FormModal from "@/modals/FormModal/FormModal.tsx";

import type { BoardColor, BoardType } from "@/types/board.ts";

type Values = Omit<BoardType, "id" | "lists">;

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

  const [titleError, setTitleError] = useState<string | null>(null);

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
    setTitleError(null);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Values = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      color: formData.get("color") as BoardColor,
    };

    if (!validateTitle(values.title)) {
      return;
    }

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
        boardId !== undefined ? "Edit Existing Board" : "Create a New Board"
      }
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
      extraActions={
        boardId !== undefined && (
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
      <TextArea
        label="Description"
        name="description"
        defaultValue={defaultValues?.description}
      />
      <ColorInput
        label="Color"
        name="color"
        defaultValue={defaultValues?.color}
      />
    </FormModal>
  );
}
