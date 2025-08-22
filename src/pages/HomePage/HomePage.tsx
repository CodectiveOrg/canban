import type { ReactNode } from "react";

import BoardCard from "@/components/BoardCard/BoardCard.tsx";
import Button from "@/components/Button/Button.tsx";

import styles from "./HomePage.module.css";

export default function HomePage(): ReactNode {
  return (
    <div className={styles["home-page"]}>
      <header>Header</header>
      <main>
        <div className={styles.header}>
          <h1>Boards</h1>
          <Button color="primary">Create</Button>
        </div>
        <ul className={styles.boards}>
          <li>
            <BoardCard
              id={1}
              title="Sprint Tasks"
              description="A board to keep track of the team's work during each sprint. Tasks move from To Do through In Progress until they reach Done."
              color="blue"
            />
          </li>
          <li>
            <BoardCard
              id={2}
              title="Content Calendar"
              description="Plan and manage posts, blogs, or videos ahead of time. Items flow from Idea to Draft and finally to Published for a smooth content pipeline."
              color="gray"
            />
          </li>
          <li>
            <BoardCard
              id={3}
              title="Personal Goals"
              description="Organize personal or professional goals into small tasks."
              color="yellow"
            />
          </li>
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
