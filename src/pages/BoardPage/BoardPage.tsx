import { type ReactNode, useRef } from "react";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";

import ActiveItemProvider from "@/providers/ActiveItemProvider.tsx";
import BoardProvider from "@/providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenButtonClick = (): void => {
    ref.current?.showModal();
  };

  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          <Button color="primary" onClick={handleOpenButtonClick}>
            Open
          </Button>

          <Modal ref={ref} heading="This is heading">
            This is children
          </Modal>

          {/*<Board />*/}
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}
