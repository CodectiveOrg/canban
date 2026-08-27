import { type ReactNode, useRef, useState } from "react";

import Button from "@/components/Button/Button.tsx";

import MingcuteCheckFill from "@/icons/MingcuteCheckFill.tsx";

import styles from "./CopyBox.module.css";

type CopyStatus = "idle" | "copied";

type Props = {
  label: string;
  value: string;
};

export default function CopyBox({ label, value }: Props): ReactNode {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeout = useRef<number>(undefined);

  const handleCopyButtonClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(value);

    setStatus("copied");

    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      setStatus("idle");
    }, 1000);
  };

  return (
    <div className={styles["copy-box"]}>
      <div className={styles.lable}>{label}</div>
      <div className={styles.box}>
        <div className={styles.value}>{value}</div>
        <Button
          color={status === "idle" ? "default" : "success"}
          onClick={handleCopyButtonClick}
        >
          {status === "idle" ? "Copy" : <MingcuteCheckFill />}
        </Button>
      </div>
    </div>
  );
}
