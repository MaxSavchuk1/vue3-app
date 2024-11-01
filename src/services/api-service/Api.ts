import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'
import { ElNotification } from 'element-plus'
import { ApiOptions } from '@/helpers/types'

class Api {
  controller?: AbortController
  service?: AxiosInstance
  onRequest: ApiOptions['onRequest']
  onSuccess: ApiOptions['onSuccess']
  onError: ApiOptions['onError']
  onFinally: ApiOptions['onFinally']
  wrapResponse: ApiOptions['wrapResponse']
  baseURL: ApiOptions['baseURL']
  responseType: ApiOptions['responseType']
  dataOnly: ApiOptions['dataOnly']
  timeout: ApiOptions['timeout']
  signal: ApiOptions['signal']
  silent: ApiOptions['silent']
  successNotification: ApiOptions['successNotification']
  headers: ApiOptions['headers'] = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  constructor(options: ApiOptions = {}) {
    this.onRequest = options?.onRequest?.bind(this)
    this.onSuccess = options?.onSuccess?.bind(this)
    this.onError = options?.onError?.bind(this)
    this.onFinally = options?.onFinally?.bind(this)
    this.wrapResponse = options?.wrapResponse?.bind(this)
    this.baseURL = options.baseURL || '/'
    this.responseType = options.responseType || 'json'
    this.dataOnly = options.dataOnly ?? true
    this.silent = options.silent ?? false
    this.timeout = options.timeout || 120000
    this.signal = options.signal
    this.successNotification = options.successNotification || ''
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
    this.defineRequestInterceptor().defineResponseInterceptor()
    return this.service?.request(config)
  }

  private defineService() {
    this.controller = new AbortController()
    this.service = axios.create({
      baseURL: this.baseURL,
      responseType: this.responseType,
      timeout: this.timeout,
      signal: this.signal || this.controller.signal
    })
    return this
  }

  private defineRequestInterceptor() {
    this.service?.interceptors.request.use(
      config => {
        config.headers = this.headers as AxiosRequestHeaders
        this.onRequest?.()
        if (!this.silent) {
          useLoaderStore().show()
        }
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
        if (!this.silent) {
          useLoaderStore().hide()
        }
        if (this.successNotification) {
          ElNotification({
            message: this.successNotification,
            type: 'success'
          })
        }
        return Promise.resolve(result)
      },
      error => {
        ElNotification({
          message: error.message,
          type: 'error'
        })
        if (this.onError) {
          this.onError(error)
        }
        if (this.onFinally) {
          this.onFinally(error)
        }
        useLoaderStore().hide()
        return Promise.reject(error)
      }
    )
    return this
  }
}

export default Api
