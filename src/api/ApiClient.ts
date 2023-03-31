import { ApiError, CommonResponse, Config, FetchError } from './common/types';

export class APIClient {
  baseURL: string;

  readonly authURL = 'auth';

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  static async returnJSON(response: Response) {
    const json: CommonResponse<any, any> = await response.json();
    if (!response.ok) {
      let errorMessage = 'Request failed';
      let errorCode = '';
      /** we must throw errors to allow react-query catch them in hooks */
      if (json.errors && json.errors.length > 0) {
        errorMessage = json.errors?.map((e: ApiError) => e.message).join(` \n`);
        errorCode = [...new Set(json.errors?.map((e: ApiError) => e.code))].join(` & `);
      }
      throw new FetchError(errorMessage, response.status, errorCode);
    }
    return json;
  }

  static async returnBlob(response: Response) {
    return response.blob();
  }

  protected async unauthorizedClient(
    endpoint: string,
    { data, token, headers: customHeaders = {}, params, ...customConfig }: Config = {}
  ) {
    const endpoinWithParams = `${endpoint}${params ? `?${new URLSearchParams(params)}` : ''}`;

    const config = {
      method: data ? 'POST' : 'GET',
      // eslint-disable-next-line no-nested-ternary
      body: data
        ? typeof window !== 'undefined' && data instanceof FormData
          ? data
          : JSON.stringify(data)
        : undefined,
      headers: {
        ...(data &&
          !(typeof window !== 'undefined' && data instanceof FormData) && {
            'Content-Type': 'application/json',
          }),
        ...(token && { Authorization: `Bearer ${token}` }),
        'Accept-Language': 'ru',
        ...customHeaders,
      },
      ssl: {
        rejectUnauthorized: false,
      },
      ...customConfig,
    };

    return fetch(`${this.baseURL}${endpoinWithParams}`, config);
  }

  public async request(endpoint: string, config?: Config) {
    // const token = await this.checkToken();
    return this.unauthorizedClient(endpoint, {
      ...config,
      // token
    }).then(APIClient.returnJSON);
  }

  public async get<T = any, M = any>(endpoint: string, config?: Omit<Config, 'data'>) {
    return this.request(endpoint, { ...config, method: 'GET' }) as Promise<CommonResponse<T, M>>;
  }

  public async post<T = any, M = any>(endpoint: string, config?: Config) {
    return this.request(endpoint, { ...config, method: 'POST' }) as Promise<CommonResponse<T, M>>;
  }

  public async patch<T = any, M = any>(endpoint: string, config?: Config) {
    return this.request(endpoint, { ...config, method: 'PATCH' }) as Promise<CommonResponse<T, M>>;
  }

  public async put<T = any, M = any>(endpoint: string, config?: Config) {
    return this.request(endpoint, { ...config, method: 'PUT' }) as Promise<CommonResponse<T, M>>;
  }

  public async delete<T = any, M = any>(endpoint: string, config?: Config) {
    return this.request(endpoint, { ...config, method: 'DELETE' }) as Promise<CommonResponse<T, M>>;
  }

  public async downloadFile(endpoint: string, config?: Config) {
    return this.unauthorizedClient(endpoint, {
      ...config,
      method: 'POST',
    }).then(APIClient.returnBlob);
  }
}
