import { type ReactNode } from "react";

import { toast } from "react-toastify";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Loading from "@/components/Loading/Loading.tsx";

import { useUser } from "@/hooks/useUser.ts";

import ChangePasswordForm from "@/pages/SettingsPage/components/ChangePasswordForm/ChangePasswordForm.tsx";
import IdentitySettingsForm from "@/pages/SettingsPage/components/IdentitySettingsForm/IdentitySettingsForm.tsx";
import PictureSettingsForm from "@/pages/SettingsPage/components/PictureSettingsForm/PictureSettingsForm.tsx";

import styles from "./SettingsPage.module.css";

export default function SettingsPage(): ReactNode {
  const { response, isLoading, isError, error } = useUser();

  if (isLoading) {
    console.log(error);
    return <Loading />;
  }

  if (isError) {
    toast.error(error.message, { toastId: "get-user-api-error" });
    return <ApiError error={error.error} message={error.message} />;
  }

  const reload = (): void => {
    window.dispatchEvent(new Event("userupdate"));
  };

  return (
    <div className={styles["settings-page"]}>
      <section>
        <h2>User Settings</h2>
        <PictureSettingsForm
          savedPicture={response.result.picture}
          username={response.result.username}
          onSubmit={reload}
        />
        <IdentitySettingsForm
          defaultValues={{
            username: response.result.username,
            email: response.result.email ?? "",
          }}
          onSubmit={reload}
        />
      </section>
      <section>
        <h2>Change Password</h2>
        <ChangePasswordForm onSubmit={reload} />
      </section>
    </div>
  );
}
