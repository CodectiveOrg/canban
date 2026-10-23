export type SharedResponseDto = {
  message: string;
};

export type OkResponseDto<TResult = void> = SharedResponseDto &
  (TResult extends void ? { result?: undefined } : { result: TResult });

export type ErrorResponseDto = SharedResponseDto & {
  error: string;
};

export type ResponseDto<TResult = void> =
  | OkResponseDto<TResult>
  | ErrorResponseDto;
