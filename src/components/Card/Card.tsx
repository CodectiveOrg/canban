import type { ReactNode } from "react";

import Post from "@/components/Post/Post.tsx";

import styles from "./Card.module.css";

export default function Card(): ReactNode {
  console.log(styles);

  return (
    <div className={styles.card}>
      <div className={styles.title}>Card Title</div>
      <div className={styles.content}>
        <Post />
      </div>
    </div>
  );
}
