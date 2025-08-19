import { type ReactNode, useState } from "react";

type Props = {
  title: string;
};

export default function Counter({ title }: Props): ReactNode {
  const [count, setCount] = useState<number>(0);

  const handleButtonClick = (): void => {
    setCount((old) => old + 1);
  };

  return (
    <div className="counter">
      <div className="title">{title}</div>
      <div className="count">{count}</div>
      <button className="increment" onClick={handleButtonClick}>
        Increment
      </button>
    </div>
  );
}
