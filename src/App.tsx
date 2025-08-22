import { type ReactNode } from "react";

import { Route, Routes } from "react-router";

import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";

import BoardPage from "@/pages/BoardPage/BoardPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";

export default function App(): ReactNode {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="board/:id" element={<BoardPage />} />
      </Route>
    </Routes>
  );
}
