import { type ReactNode, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitch(): ReactNode {
  const [theme, setTheme] = useState<Theme>("light");

  const handleButtonClick = (): void => {
    setTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <div>{theme}</div>
      <button onClick={handleButtonClick}>Change Theme</button>
    </div>
  );
}
