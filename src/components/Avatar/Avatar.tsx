import { type ReactNode, useEffect, useState } from "react";

import clsx from "clsx";

import Initials from "@/components/Initials/Initials.tsx";

import type { User } from "@/entities/user.ts";

import { generatePictureUrl } from "@/utils/url-utils.ts";

import styles from "./Avatar.module.css";

type Props = Pick<User, "picture" | "username"> & {
  className?: string;
  size?: number;
};

export default function Avatar({
  className,
  picture,
  username,
  size = 24,
}: Props): ReactNode {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
  }, [picture]);

  if (!picture || hasError) {
    return (
      <Initials
        className={className}
        title={username}
        color="gray"
        size={size}
      />
    );
  }

  return (
    <img
      className={clsx(styles.avatar, className)}
      src={generatePictureUrl(picture)}
      alt=""
      width={size}
      height={size}
      onError={() => setHasError(true)}
    />
  );
}
