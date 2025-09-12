import { z } from "zod";

import { TitleSchema } from "@/schemas/title-schema.ts";

export const ListSchema = z.object({
  title: TitleSchema,
});
