import { type ReactNode, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getUserApi } from "@/api/user/get-user-api.ts";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Loading from "@/components/Loading/Loading.tsx";

import type { ResponseDto } from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

import IdentitySettingsForm from "@/pages/SettingsPage/components/IdentitySettingsForm/IdentitySettingsForm.tsx";

import styles from "./SettingsPage.module.css";

export default function SettingsPage(): ReactNode {
  const [response, setResponse] = useState<ResponseDto<SafeUser> | null>(null);

  useEffect(() => {
    getUserApi().then((response) => {
      setResponse(response);
    });
  }, []);

  if (response === null) {
    return <Loading />;
  }

  if ("error" in response) {
    toast.error(response.message, { toastId: "get-user-api-error" });
    return <ApiError error={response.error} message={response.message} />;
  }
  return (
    <div className={styles["settings-page"]}>
      <h1>Account Settings</h1>
      <IdentitySettingsForm
        defaultValues={{
          username: response.result.username,
          email: response.result.email ?? "",
        }}
      />
    </div>
  );
}
