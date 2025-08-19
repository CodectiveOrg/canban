import { type ReactNode } from "react";

import Counter from "@/components/Counter/Counter.tsx";

import "./App.css";

export default function App(): ReactNode {
  return (
    <div className="app">
      <Counter />
      <Counter />
    </div>
  );
}
