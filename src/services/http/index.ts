import axios from 'axios';
import queryString from 'query-string';
import { HTTP_TIMEOUT_DURATION } from 'src/constants/common';

export class HttpService {
  getTimeOutDuration() {
    return HTTP_TIMEOUT_DURATION;
  }

  async getHeaders(
    options?: IHttpRequestOptions
  ): Promise<Record<string, string>> {
    let headers: Record<string, string > = {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  }

  async get(
    url: string,
    queryParams: Record<string, any> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<any> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.get(url, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async post(
    url: string,
    postData: unknown,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.post(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async put(
    url: string,
    postData: unknown,
    queryParams: Record<string, any> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.put(url, postData, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async patch(
    url: string,
    postData: unknown,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.patch(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async delete(
    url: string,
    options?: IHttpRequestOptions,
    timeOut?: number,
    data?: TObject,
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.delete(url, {
      data,
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }
}
