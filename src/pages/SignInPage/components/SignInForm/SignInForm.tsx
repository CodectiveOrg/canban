import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button/Button.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

import type { ResponseDto } from "@/dto/response.dto.ts";

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
    try {
      const response = await fetch("https://api.canban.ir/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = (await response.json()) as ResponseDto;

      if ("error" in data) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again later.");
    }
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
