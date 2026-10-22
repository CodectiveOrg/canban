import { z } from "zod";

export const EmailSchema = z
  .email("Email must be a valid email address.")
  .trim();
