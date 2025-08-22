import { type ReactNode } from "react";

import clsx from "clsx";

import styles from "./App.module.css";

export default function App(): ReactNode {
  return (
    <div className={styles.app}>
      <header>Header</header>
      <main>
        <div className={styles.header}>
          <h1>Boards</h1>
          <button>Create</button>
        </div>
        <ul className={styles.boards}>
          <li>
            <div className={clsx(styles.board, "blue")}>
              <div className={styles.cover}></div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.title}>Board 1</div>
                  <a href="/board">View</a>
                </div>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolor, nobis?
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={clsx(styles.board, "gray")}>
              <div className={styles.cover}></div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.title}>Board 2</div>
                  <a href="/board">View</a>
                </div>
                <p className={styles.description}>
                  Accusamus adipisci at atque corporis dolorum eligendi expedita
                  hic ipsam, laboriosam magni mollitia nobis nostrum,
                  perferendis praesentium provident quae reprehenderit sapiente
                  voluptates!
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={clsx(styles.board, "yellow")}>
              <div className={styles.cover}></div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.title}>Board 3</div>
                  <a href="/board">View</a>
                </div>
                <p className={styles.description}>
                  Accusamus architecto, asperiores aut autem dignissimos earum
                  error eveniet harum illo maiores maxime molestiae nam saepe
                </p>
              </div>
            </div>
          </li>
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
