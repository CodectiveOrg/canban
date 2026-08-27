import type { ResponseDto } from "@/dto/response-dto.ts";

import type { User } from "@/entities/user.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export type SignInRequestDto = Pick<User, "username" | "password">;

export async function signInApi(dto: SignInRequestDto): Promise<ResponseDto> {
  return richFetch("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
