import { type ReactNode, useState } from "react";

import Counter from "@/components/Counter/Counter.tsx";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

import "./App.css";

export type Theme = "light" | "dark";

export default function App(): ReactNode {
  const [theme, setTheme] = useState<Theme>("light");

  const handleToggle = (): void => {
    setTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <ThemeSwitch theme={theme} onToggle={handleToggle} />
      <Counter theme={theme} title="Counter 1">
        <ThemeSwitch theme={theme} onToggle={handleToggle} />
      </Counter>
      <Counter theme={theme} title="Counter 2">
        <p>This is counter 2</p>
      </Counter>
    </div>
  );
}
