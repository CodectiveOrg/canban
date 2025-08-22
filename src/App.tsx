import { type ReactNode } from "react";

import { Route, Routes } from "react-router";

import BoardPage from "@/pages/BoardPage/BoardPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";

export default function App(): ReactNode {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="board" element={<BoardPage />} />
    </Routes>
  );
}
