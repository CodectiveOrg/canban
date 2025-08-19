import { type Dispatch, type ReactNode, type SetStateAction } from "react";

import type { Theme } from "@/App.tsx";

type Props = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export default function ThemeSwitch({ theme, setTheme }: Props): ReactNode {
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
