import { type ReactNode, useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router";

import { toast } from "react-toastify";

import { verifyApi } from "@/api/auth/verify-api.ts";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Loading from "@/components/Loading/Loading.tsx";

import type { ResponseDto } from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

export default function GuestOnlyGuard(): ReactNode {
  const [response, setResponse] = useState<ResponseDto<SafeUser> | null>(null);

  useEffect(() => {
    verifyApi().then((response) => {
      setResponse(response);
    });
  }, []);

  if (response === null) {
    return <Loading />;
  }

  if ("error" in response) {
    if (response.error === "Unauthorized") {
      return <Outlet />;
    }

    toast.error(response.message, { toastId: "verify-api-error" });
    return <ApiError error={response.error} message={response.message} />;
  }

  return (
    <>
      <Loading />;
      <Navigate to="/" replace />
    </>
  );
}
