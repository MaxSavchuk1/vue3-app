import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'
import { IApiOptions } from '../../helpers/types'

class Api {
  controller?: AbortController
  service?: AxiosInstance
  requestConfig?: AxiosRequestConfig
  onRequest: IApiOptions['onRequest']
  onSuccess: IApiOptions['onSuccess']
  onError: IApiOptions['onError']
  onFinally: IApiOptions['onFinally']
  wrapResponse: IApiOptions['wrapResponse']
  baseURL: IApiOptions['baseURL']
  responseType: IApiOptions['responseType']
  dataOnly: IApiOptions['dataOnly']
  timeout: IApiOptions['timeout']
  signal: IApiOptions['signal']
  headers: IApiOptions['headers'] = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  constructor(options: IApiOptions = {}) {
    this.onRequest = options?.onRequest?.bind(this)
    this.onSuccess = options?.onSuccess?.bind(this)
    this.onError = options?.onError?.bind(this)
    this.onFinally = options?.onFinally?.bind(this)
    this.wrapResponse = options?.wrapResponse?.bind(this)
    this.baseURL = options.baseURL || '/'
    this.responseType = options.responseType || 'json'
    this.dataOnly = options.dataOnly ?? true
    this.timeout = options.timeout || 120000
    this.signal = options.signal
    this.headers = {
      ...this.headers,
      ...options.headers
    }

    this.defineService()
  }

  public cancel(message = '') {
    this.controller?.abort(message)
    console.log('Request aborted')
  }

  public get(url: string, params = null, config = {}) {
    return this.request({
      url,
      method: 'get',
      params,
      data: null,
      ...config
    })
  }

  public post(url: string, data = {}, config = {}) {
    return this.request({
      url,
      method: 'post',
      data,
      ...config
    })
  }

  public put(url: string, data = {}, config = {}) {
    return this.request({
      url,
      method: 'put',
      data,
      ...config
    })
  }

  public delete(url: string, config = {}) {
    return this.request({
      url,
      method: 'delete',
      ...config
    })
  }

  private request(config: AxiosRequestConfig) {
    this.requestConfig = config
    this.defineRequestInterceptor().defineResponseInterceptor()
    return this.service?.request(config)
  }

  private defineService() {
    this.controller = this.signal || new AbortController()
    this.service = axios.create({
      baseURL: this.baseURL,
      responseType: this.responseType,
      timeout: this.timeout,
      signal: this.controller.signal
    })
    return this
  }

  private defineRequestInterceptor() {
    this.service?.interceptors.request.use(
      config => {
        config.headers = this.headers as AxiosRequestHeaders
        this.onRequest?.()
        return config
      },
      error => {
        console.log('Request error >>>', error)
        return Promise.reject(error)
      }
    )
    return this
  }

  private defineResponseInterceptor() {
    this.service?.interceptors.response.use(
      async response => {
        const responseData = response
        if (this.wrapResponse) {
          responseData.data = this.wrapResponse(responseData.data)
        }
        const result = this.dataOnly ? responseData.data : responseData
        if (this.onSuccess) {
          await this.onSuccess(result)
        }
        if (this.onFinally) {
          await this.onFinally(result)
        }
        return Promise.resolve(result)
      },
      error => {
        if (this.onError) {
          this.onError(error)
        }
        if (this.onFinally) {
          this.onFinally(error)
        }
        return Promise.reject(error)
      }
    )
    return this
  }
}

export default Api
