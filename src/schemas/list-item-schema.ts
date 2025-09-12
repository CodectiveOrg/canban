import { z } from "zod";

import { DescriptionSchema } from "@/schemas/description-schema.ts";
import { TitleSchema } from "@/schemas/title-schema.ts";

export const ListItemSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  dueDate: z.string(),
});
