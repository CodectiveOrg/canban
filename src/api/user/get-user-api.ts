import type { ResponseDto } from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

import { richFetch } from "@/utils/fetch-utils.ts";

export async function getUserApi(): Promise<ResponseDto<SafeUser>> {
  return richFetch<SafeUser>("/user");
}
