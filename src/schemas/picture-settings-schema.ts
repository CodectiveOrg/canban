import { z } from "zod";

export const PictureSettingsSchema = z.object({
  picture: z.instanceof(File).or(z.literal("")),
});
