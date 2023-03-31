export interface OffsetPaginationQuery {
  limit: number;
  type: 'offset';
  offset: number;
}

export interface OffsetPagination extends OffsetPaginationQuery {
  total: number;
}

export class FetchError extends Error {
  constructor(public message: string, public status: number, public code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export interface ApiError {
  code: number;
  error: string;
  statusCode: number;
  message?: string;
  stack?: string;
}

export interface CommonResponseMeta {
  pagination?: OffsetPagination;
}

export interface CommonResponse<T, M = CommonResponseMeta> {
  data: T;
  meta: M;
  errors?: ApiError[];
}

export interface Config {
  token?: string;
  data?: any;
  headers?: Record<string, string>;
  params?: any;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  timeout?: number;
}

type StrOrMinusStr<T extends string> = T extends `-${infer R}` ? R | `-${R}` : T | `-${T}`;
type AscDescSort<T> = T extends string ? StrOrMinusStr<T> : never;
type UnUnion<T, S> = T extends S ? ([S] extends [T] ? T : never) : never;
type NotUnion<T> = UnUnion<T, T>;
type LiteralString<T extends string> = string extends T ? never : NotUnion<T>;

export interface CommonSearchParams<
  F,
  S extends string = never,
  I extends string = string,
  P extends OffsetPaginationQuery = OffsetPaginationQuery
> {
  filter?: F;
  sort?: LiteralString<S> extends never ? AscDescSort<S> | [AscDescSort<S>] : AscDescSort<S>;
  include?: I[];
  pagination?: P;
}
