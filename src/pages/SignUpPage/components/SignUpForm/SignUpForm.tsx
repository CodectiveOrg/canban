import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUpApi } from "@/api/auth/sign-up-api.ts";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { SignUpSchema } from "@/schemas/sign-up-schema.ts";

import styles from "./SignUpForm.module.css";

type Values = z.infer<typeof SignUpSchema>;

export default function SignUpForm(): ReactNode {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const handleFormSubmit = async (values: Values): Promise<void> => {
    const data = await signUpApi(values);

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    navigate("/");
  };

  return (
    <form
      className={styles["sign-up-form"]}
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
      <Button color="primary">Sign Up</Button>
    </form>
  );
}
