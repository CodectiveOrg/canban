import { type ComponentProps, type ReactNode } from "react";

import Button from "@/components/Button/Button.tsx";

import Modal from "@/modals/Modal/Modal.tsx";

import styles from "./FormModal.module.css";

type ModalProps = {
  modalRef: ComponentProps<typeof Modal>["ref"];
  heading: ComponentProps<typeof Modal>["heading"];
  onClose: ComponentProps<typeof Modal>["onClose"];
};

type FormProps = ComponentProps<"form"> & {
  onRemove?: false | (() => void);
};

type Props = ModalProps & FormProps;

export default function FormModal({
  modalRef,
  heading,
  onClose,
  onRemove,
  children,
  ...otherProps
}: Props): ReactNode {
  const handleCancelButtonClick = (): void => {
    modalRef.current?.close();
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={styles["form-modal"]}
      heading={heading}
      onClose={onClose}
    >
      <form {...otherProps}>
        {children}
        <div className={styles.actions}>
          {onRemove && (
            <Button
              type="button"
              variant="text"
              color="danger"
              onClick={onRemove}
            >
              Remove
            </Button>
          )}
          <Button
            className={styles.cancel}
            type="reset"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
