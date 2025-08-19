import { type ReactNode } from "react";

import Counter from "@/components/Counter/Counter.tsx";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.tsx";

import "./App.css";

export default function App(): ReactNode {
  return (
    <div className="app">
      <ThemeSwitch />
      <Counter title="Counter 1" />
      <Counter title="Counter 2" />
    </div>
  );
}
