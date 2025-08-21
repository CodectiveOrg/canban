import { type PropsWithChildren, type ReactNode, useState } from "react";

import type { Theme } from "@/App.tsx";

type Props = PropsWithChildren<{
  theme: Theme;
  title: string;
  primary?: boolean;
}>;

export default function Counter({
  theme,
  title,
  primary = false,
  children,
}: Props): ReactNode {
  console.log(title);

  const [count, setCount] = useState<number>(0);

  const handleButtonClick = (): void => {
    setCount((old) => old + 1);
  };

  return (
    <div className={`counter ${theme} ${primary ? "primary" : ""}`}>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
      <button className="increment" onClick={handleButtonClick}>
        Increment
      </button>
      <div className="children">{children}</div>
    </div>
  );
}
