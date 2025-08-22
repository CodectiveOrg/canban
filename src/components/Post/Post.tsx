import type { ReactNode } from "react";

import styles from "./Post.module.css";

export default function Post(): ReactNode {
  return (
    <div className={styles.post}>
      <div className={styles.title}>Post Title</div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        consequatur debitis ea ex impedit nihil provident voluptas voluptates.
        A, ea est et eveniet excepturi itaque laborum laudantium omnis possimus
        similique!
      </p>
    </div>
  );
}
