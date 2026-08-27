import type { ResponseDto } from "@/dto/response-dto.ts";

export async function richFetch<TResult = void>(
  url: string,
  init?: RequestInit,
): Promise<ResponseDto<TResult>> {
  try {
    const response = await fetch(prepareUrl(url), prepareInit(init));
    const data = await response.json();
    return data as ResponseDto<TResult>;
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong! Please try again later.",
      error: "Fetch Error",
    };
  }
}

function prepareUrl(url: string): string {
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
}

function prepareInit(init?: RequestInit): RequestInit {
  return {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  };
}
