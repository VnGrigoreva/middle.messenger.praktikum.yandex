import { queryStringify } from '../utils';

export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type OptionsType = {
  timeout?: number,
  method: Methods,
  headers?: {[key: string]: string},
  data?: {[key: string]: string} ,
}

export class HTTPTransport {
  get = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      { ...options, method: Methods.GET },
      options?.timeout
    );
  };

  put = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      { ...options, method: Methods.PUT },
      options?.timeout
    );
  };

  post = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      { ...options, method: Methods.POST },
      options?.timeout
    );
  };

  delete = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      { ...options, method: Methods.DELETE },
      options?.timeout
    );
  };

  request = (url: string, options?: OptionsType, timeout = 5000) => {
    const { headers = {}, method, data } = options || {};

    return new Promise((resolve, reject) => {
      const methodType = method || 'GET';

      const xhr = new XMLHttpRequest();

      xhr.open(methodType, `${url}${queryStringify(data)}`);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xhr.send(options?.data);
      } else {
        xhr.send();
      }
    });
  };
}
