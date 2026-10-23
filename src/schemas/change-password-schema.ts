import { z } from "zod";

import { strictPasswordSchema } from "@/schemas/password-schema.ts";

export const ChangePasswordSchema = z
  .object({
    password: strictPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
