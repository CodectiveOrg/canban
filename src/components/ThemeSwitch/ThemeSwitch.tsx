import { type ReactNode } from "react";

import type { Theme } from "@/App.tsx";

type Props = {
  theme: Theme;
  onToggle: () => void;
};

export default function ThemeSwitch({ theme, onToggle }: Props): ReactNode {
  const handleButtonClick = (): void => {
    onToggle();
  };

  return (
    <div>
      <div>{theme}</div>
      <button onClick={handleButtonClick}>Change Theme</button>
    </div>
  );
}
