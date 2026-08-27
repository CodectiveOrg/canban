import type { ResponseDto } from "@/dto/response-dto";

import type { SafeUser } from "@/entities/user.ts";

import { richFetch } from "@/utils/fetch.utils";

export async function verifyApi(): Promise<ResponseDto<SafeUser>> {
  return richFetch<SafeUser>("/auth/verify");
}
