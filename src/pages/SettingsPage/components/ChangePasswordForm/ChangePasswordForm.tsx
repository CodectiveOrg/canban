import type { ReactNode } from "react";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateUserApi } from "@/api/user/update-user-api.ts";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { ChangePasswordSchema } from "@/schemas/change-password-schema.ts";

import styles from "./ChangePasswordForm.module.css";

type Values = z.infer<typeof ChangePasswordSchema>;

type Props = {
  onSubmit?: () => void;
};

export default function ChangePasswordForm({ onSubmit }: Props): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleFormSubmit = async (values: Values): Promise<void> => {
    const data = await updateUserApi(values);

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    onSubmit?.();
  };

  return (
    <form
      className={styles["change-password-form"]}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.inputs}>
        <TextInput
          {...register("password")}
          label="New Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
        />
        <TextInput
          {...register("confirmPassword")}
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
        />
      </div>
      <Button color="primary">Change Password</Button>
    </form>
  );
}
