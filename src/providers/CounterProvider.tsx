import { type PropsWithChildren, type ReactNode, useState } from "react";

import { CounterContext } from "@/context/counter-context.ts";

type Props = PropsWithChildren;

export default function CounterProvider({ children }: Props): ReactNode {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => {
    setCount((old) => old + 1);
  };

  const decrement = (): void => {
    setCount((old) => old - 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  return (
    <CounterContext value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext>
  );
}
