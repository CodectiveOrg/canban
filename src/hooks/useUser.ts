import { useEffect, useState } from "react";

import { getUserApi } from "@/api/user/get-user-api.ts";

import type {
  ErrorResponseDto,
  OkResponseDto,
  ResponseDto,
} from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

type LoadingResult = {
  response: null;
  isLoading: true;
  isError: false;
  error: null;
};

type OkResult = {
  response: OkResponseDto<SafeUser>;
  isLoading: false;
  isError: false;
  error: null;
};

type ErrorResult = {
  response: null;
  isLoading: false;
  isError: true;
  error: ErrorResponseDto;
};

type Result = LoadingResult | OkResult | ErrorResult;

export function useUser(): Result {
  const [response, setResponse] = useState<ResponseDto<SafeUser> | null>(null);

  useEffect(() => {
    const loadUser = (): void => {
      getUserApi().then((response) => {
        setResponse(response);
      });
    };

    window.addEventListener("userupdate", loadUser);
    loadUser();

    return () => {
      window.removeEventListener("userupdate", loadUser);
    };
  }, []);

  if (response === null) {
    return {
      response: null,
      isLoading: true,
      isError: false,
      error: null,
    };
  }

  if ("error" in response) {
    return {
      response: null,
      isLoading: false,
      isError: true,
      error: response,
    };
  }

  return {
    response,
    isLoading: false,
    isError: false,
    error: null,
  };
}
