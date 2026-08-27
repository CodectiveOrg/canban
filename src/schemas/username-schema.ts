import { z } from "zod";

export const UsernameSchema = z
  .string("Username must be a string.")
  .trim()
  .nonempty("Username cannot be empty.");
