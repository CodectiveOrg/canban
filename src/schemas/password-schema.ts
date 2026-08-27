import { z } from "zod";

export const PasswordSchema = z
  .string("Password must be a string.")
  .nonempty("Password cannot be empty.");
