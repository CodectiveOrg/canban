import type { ReactNode } from "react";

import CopyBox from "@/CopyBox/CopyBox.tsx";

import styles from "./RandomCredentials.module.css";

type Props = {
  username: string;
  password: string;
};

export default function RandomCredentials({
  username,
  password,
}: Props): ReactNode {
  return (
    <div className={styles["random-credentials"]}>
      <CopyBox label="Username" value={username} />
      <CopyBox label="Password" value={password} />
    </div>
  );
}
