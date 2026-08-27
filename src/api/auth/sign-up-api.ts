import type { ResponseDto } from "@/dto/response-dto.ts";

import type { User } from "@/entities/user.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export type SignUpRequestDto = Pick<User, "username" | "password">;

export async function signUpApi(dto: SignUpRequestDto): Promise<ResponseDto> {
  return richFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
