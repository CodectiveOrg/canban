import { z } from "zod";

import { PasswordSchema } from "@/schemas/password-schema.ts";
import { UsernameSchema } from "@/schemas/username-schema.ts";

export const SignInSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
