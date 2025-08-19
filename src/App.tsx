import { type ReactNode, useState } from "react";

import "./App.css";

export default function App(): ReactNode {
  const [count, setCount] = useState(0);

  const increment = (): void => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// 1. Changes to Local Variables Won't Trigger Renders
// 2. Local variables Don't Persist Between Renders
