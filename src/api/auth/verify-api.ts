import type { ResponseDto } from "@/dto/response-dto.ts";

import { richFetch } from "@/utils/fetch-utils.ts";

export async function verifyApi(): Promise<ResponseDto> {
  return richFetch("/auth/verify");
}
