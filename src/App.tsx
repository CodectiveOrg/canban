import { type ReactNode, useState } from "react";

import "./App.css";

export default function App(): ReactNode {
  const [numbers, setNumbers] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const handleButtonClick = (): void => {
    setNumbers((old) => {
      const newNumbers = [...old];
      newNumbers.splice(3, 1);
      return newNumbers;
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(numbers, null, 2)}</pre>
      <button onClick={handleButtonClick}>Remove Index 3</button>
    </div>
  );
}

// 1. Changes to Local Variables Won't Trigger Renders
// 2. Local variables Don't Persist Between Renders
