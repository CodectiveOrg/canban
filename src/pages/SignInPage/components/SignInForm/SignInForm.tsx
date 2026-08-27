import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInApi } from "@/api/auth/sign-in-api.ts";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { SignInSchema } from "@/schemas/sign-in-schema.ts";

import styles from "./SignInForm.module.css";

type Values = z.infer<typeof SignInSchema>;

export default function SignInForm(): ReactNode {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = async (values: Values): Promise<void> => {
    const data = await signInApi(values);

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    navigate("/");
  };

  return (
    <form
      className={styles["sign-in-form"]}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextInput
        {...register("username")}
        label="Username"
        type="text"
        error={errors.username?.message}
      />
      <TextInput
        {...register("password")}
        label="Password"
        type="password"
        error={errors.password?.message}
      />
      <Button color="primary">Sign In</Button>
    </form>
  );
}
