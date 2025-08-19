import { type ReactNode, useState } from "react";

import type { Theme } from "@/App.tsx";

type Props = {
  theme: Theme;
  title: string;
};

export default function Counter({ theme, title }: Props): ReactNode {
  const [count, setCount] = useState<number>(0);

  const handleButtonClick = (): void => {
    setCount((old) => old + 1);
  };

  return (
    <div className={`counter ${theme}`}>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
      <button className="increment" onClick={handleButtonClick}>
        Increment
      </button>
    </div>
  );
}
