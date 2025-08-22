import { type ReactNode } from "react";

import Card from "@/components/Card/Card.tsx";
import Post from "@/components/Post/Post.tsx";

import styles from "./App.module.css";

export default function App(): ReactNode {
  return (
    <div className={styles.app}>
      <Card />
      <Post />
    </div>
  );
}
