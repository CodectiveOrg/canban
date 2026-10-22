import { type ReactNode, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getUserApi } from "@/api/user/get-user-api.ts";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Loading from "@/components/Loading/Loading.tsx";

import type { ResponseDto } from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

import ChangePasswordForm from "@/pages/SettingsPage/components/ChangePasswordForm/ChangePasswordForm.tsx";
import IdentitySettingsForm from "@/pages/SettingsPage/components/IdentitySettingsForm/IdentitySettingsForm.tsx";
import PictureSettingsForm from "@/pages/SettingsPage/components/PictureSettingsForm/PictureSettingsForm.tsx";

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

  const reloadResponse = async (): Promise<void> => {
    const updatedResponse = await getUserApi();
    if ("error" in updatedResponse) {
      toast.error(updatedResponse.message);
    } else {
      setResponse(updatedResponse);
    }
  };

  return (
    <div className={styles["settings-page"]}>
      <section>
        <h2>User Settings</h2>
        <PictureSettingsForm
          savedPicture={response.result.picture}
          username={response.result.username}
          onSubmit={reloadResponse}
        />
        <IdentitySettingsForm
          defaultValues={{
            username: response.result.username,
            email: response.result.email ?? "",
          }}
          onSubmit={reloadResponse}
        />
      </section>
      <section>
        <h2>Change Password</h2>
        <ChangePasswordForm onSubmit={reloadResponse} />
      </section>
    </div>
  );
}
