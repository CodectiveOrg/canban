import { z } from "zod";

import { EmailSchema } from "@/schemas/email-schema.ts";
import { strictUsernameSchema } from "@/schemas/username-schema.ts";

export const IdentitySettingsSchema = z.object({
  username: strictUsernameSchema,
  email: EmailSchema.or(z.literal("")),
});
