import { z } from "zod";

import { BOARD_COLORS } from "@/types/board.ts";

export const ColorSchema = z.enum(
  BOARD_COLORS,
  "Color must be one of the specified options.",
);
