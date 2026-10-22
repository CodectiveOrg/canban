import type { ReactNode } from "react";

import { toast } from "react-toastify";

import { updateUserApi } from "@/api/user/update-user-api.ts";

import PictureInput from "@/components/PictureInput/PictureInput.tsx";

import styles from "./PictureSettingsForm.module.css";

type Props = {
  savedPicture: string | null;
  username: string;
  onSubmit?: () => Promise<void>;
};

export default function PictureSettingsForm({
  savedPicture,
  username,
  onSubmit,
}: Props): ReactNode {
  const updatePicture = async (picture: File | ""): Promise<void> => {
    const data = await updateUserApi({ picture });

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    await onSubmit?.();
  };

  return (
    <div className={styles["picture-settings-form"]}>
      <PictureInput
        label="Profile Picture"
        hint="Upload a JPG or PNG image, up to 5 MB."
        savedPicture={savedPicture}
        username={username}
        onChange={(e) => updatePicture(e.currentTarget.files?.[0] ?? "")}
        onRemove={() => updatePicture("")}
      />
    </div>
  );
}
