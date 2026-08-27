import { z } from "zod";

export const UsernameSchema = z
  .string("Username must be a string.")
  .trim()
  .nonempty("Username cannot be empty.");

export const strictUsernameSchema = UsernameSchema.min(
  3,
  "Username must be at least 3 characters long.",
);
