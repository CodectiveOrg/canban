import { type ReactNode, useState } from "react";

import Counter from "@/components/Counter/Counter.tsx";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

import "./App.css";

export type Theme = "light" | "dark";

export default function App(): ReactNode {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div className="app">
      <ThemeSwitch theme={theme} setTheme={setTheme} />
      <Counter title="Counter 1" />
      <Counter title="Counter 2" />
    </div>
  );
}
