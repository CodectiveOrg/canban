import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import { SignInSchema } from "@/schemas/sign-in-schema.ts";

import styles from "./SignInForm.module.css";

type Values = z.infer<typeof SignInSchema>;

export default function SignInForm(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = (values: Values): void => {
    console.log(values);
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
