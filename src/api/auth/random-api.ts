import type { ResponseDto } from "@/dto/response-dto";

import type { User } from "@/entities/user.ts";

import { richFetch } from "@/utils/fetch.utils";

type RandomUser = Pick<User, "username" | "password">;

export async function randomApi(): Promise<ResponseDto<RandomUser>> {
  return richFetch<RandomUser>("/auth/random", { method: "POST" });
}
