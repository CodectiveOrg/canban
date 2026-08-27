import { z } from "zod";

import { strictPasswordSchema } from "@/schemas/password-schema.ts";
import { strictUsernameSchema } from "@/schemas/username-schema.ts";

export const SignUpSchema = z.object({
  username: strictUsernameSchema,
  password: strictPasswordSchema,
});
