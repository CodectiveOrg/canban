import {
  type ComponentProps,
  type ReactNode,
  type RefObject,
  useRef,
} from "react";

import Button from "@/components/Button/Button.tsx";

import Modal from "@/modals/Modal/Modal.tsx";

import styles from "./FormModal.module.css";

type ModalProps = {
  modalRef: ComponentProps<typeof Modal>["ref"];
  heading: ComponentProps<typeof Modal>["heading"];
};

type FormProps = Omit<ComponentProps<"form">, "ref"> & {
  formRef?: RefObject<HTMLFormElement | null>;
  onRemove?: false | (() => void);
};

type Props = ModalProps & FormProps;

export default function FormModal({
  modalRef,
  formRef,
  heading,
  onRemove,
  children,
  ...otherProps
}: Props): ReactNode {
  const internalFormRef = useRef<HTMLFormElement>(null);

  const handleModalClose = (): void => {
    internalFormRef.current?.reset();
  };

  const handleCancelButtonClick = (): void => {
    modalRef.current?.close();
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={styles["form-modal"]}
      heading={heading}
      onClose={handleModalClose}
    >
      <form
        ref={(node) => {
          internalFormRef.current = node;

          if (formRef) {
            formRef.current = node;
          }
        }}
        {...otherProps}
      >
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
