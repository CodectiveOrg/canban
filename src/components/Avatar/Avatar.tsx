import type { ReactNode } from "react";

import Initials from "@/components/Initials/Initials.tsx";

import type { User } from "@/entities/user.ts";

import { generatePictureUrl } from "@/utils/url-utils.ts";

import styles from "./Avatar.module.css";

type Props = Pick<User, "picture" | "username">;

export default function Avatar({ picture, username }: Props): ReactNode {
  if (!picture) {
    return <Initials title={username} color="gray" />;
  }

  return (
    <img
      className={styles.avatar}
      src={generatePictureUrl(picture)}
      alt=""
      width={24}
      height={24}
    />
  );
}
