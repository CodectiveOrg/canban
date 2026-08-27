import { type ReactNode } from "react";

import { Route, Routes } from "react-router";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout.tsx";
import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";

import BoardPage from "@/pages/BoardPage/BoardPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";
import SignInPage from "@/pages/SignInPage/SignInPage.tsx";
import SignUpPage from "@/pages/SignUpPage/SignUpPage.tsx";

export default function App(): ReactNode {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="board/:boardId" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
