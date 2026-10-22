import type { ReactNode } from "react";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateUserApi } from "@/api/user/update-user-api.ts";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { IdentitySettingsSchema } from "@/schemas/identity-settings-schema.ts";

import styles from "./IdentitySettingsForm.module.css";

type Values = z.infer<typeof IdentitySettingsSchema>;

type Props = {
  defaultValues: Values;
  onSubmit?: () => void;
};

export default function IdentitySettingsForm({
  defaultValues,
  onSubmit,
}: Props): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(IdentitySettingsSchema),
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
      className={styles["identity-settings-form"]}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.inputs}>
        <TextInput
          {...register("username")}
          label="Username"
          type="text"
          autoComplete="username"
          error={errors.username?.message}
        />
        <TextInput
          {...register("email")}
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
        />
      </div>
      <Button color="primary">Save Changes</Button>
    </form>
  );
}
