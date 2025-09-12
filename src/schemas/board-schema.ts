import { z } from "zod";

import { ColorSchema } from "@/schemas/color-schema.ts";
import { DescriptionSchema } from "@/schemas/description-schema.ts";
import { TitleSchema } from "@/schemas/title-schema.ts";

export const BoardSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  color: ColorSchema,
});
