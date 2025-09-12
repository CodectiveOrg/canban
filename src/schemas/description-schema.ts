import { z } from "zod";

export const DescriptionSchema = z
  .string("Description must be a string.")
  .trim()
  .max(1000, "Description must be less than 1000 characters.");
