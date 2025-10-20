/**
 * Axios Response Handler
 * @file Axios Response Handler (composable)
 * @author YANG ZHITAO <edwardyzt@gmail.com>
 * @example
 * ```ts
 * const { error, data } = await withResponse(() => axios.get('/api/v1/users'))
 * ```
 */
import { AxiosError } from 'axios'

import type { AxiosResponse } from 'axios'

/**
 * types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ResponseError<T = unknown, D = any> extends Error {
  isAuthError: boolean = false
  isClientError: boolean = false
  isServerError: boolean = false

  message: string = 'Error occurred'
  cause: AxiosError

  constructor(error: AxiosError<T, D>, options?: { message?: string }) {
    super(error.message)
    this.cause = error
    this.message = options?.message ?? this.cause.message
    // error type
    const status_code = error.response?.status ?? 0
    this.isAuthError = status_code === 401 || status_code === 403
    this.isClientError = status_code >= 400 && status_code < 500 && !this.isAuthError
    this.isServerError = status_code >= 500
  }
}

export interface useResponseOptions<T> {
  throwError?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: ResponseError<T>) => void
  onAuthError?: (error: ResponseError<T>) => void
  onClientError?: (error: ResponseError<T>) => void
  onServerError?: (error: ResponseError<T>) => void
}

export interface ResponseInfo<T> {
  error?: ResponseError<T>
  data: T
}

/**
 * withResponse
 */
export async function withResponse<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
  options: useResponseOptions<T> = { throwError: true },
): Promise<ResponseInfo<T>> {
  const [resp, resp_error, e] = await requestFn()
    .then((res) => [res, undefined])
    .catch((e) => {
      const axios_error = e as AxiosError<T>
      const response_error = new ResponseError<T>(axios_error)
      // console.error('Handling error during await requestFn():\n', e)
      return [axios_error?.response, response_error, e]
    })
    .catch((e) => {
      console.error('Unhandled error during await requestFn():\n', e)
      return [undefined, undefined, e]
    })

  // console.debug('withResponse:\n', [resp, error, e])
  let error = resp_error
  let data
  if (resp) {
    const parsed = _parseResponse<T>(resp)
    error = error ?? parsed[0]
    data = parsed[1]
  } else {
    // console.debug('No response from requestFn()')
    throw e
  }

  if (error) {
    if (error.isAuthError && options.onAuthError) {
      options.onAuthError(error)
    }
    if (error.isClientError && options.onClientError) {
      options.onClientError(error)
    }
    if (error.isServerError && options.onServerError) {
      options.onServerError(error)
    }
    if (options.onError) {
      options.onError(error)
    }
    if (options.throwError) {
      throw error
    }
  } else {
    if (options.onSuccess) {
      options.onSuccess(data)
    }
  }
  return { error, data }
}

function _parseResponse<T>(resp: AxiosResponse<T>): [ResponseError<T> | undefined, T] {
  const status_code = resp.status
  // http status code
  if (status_code >= 200 && status_code < 400) {
    // 2xx: success || 3xx: redirect
    // handle success
    const data = resp.data
    return [undefined, data]
  } else {
    // handle error
    const axios_error = new AxiosError(
      `Response code ${status_code}`,
      status_code.toString(),
      resp.config,
      resp.request,
      resp,
    )
    const error = new ResponseError(axios_error, { message: resp.statusText })
    const data = resp.data
    return [error, data]
  }
}
