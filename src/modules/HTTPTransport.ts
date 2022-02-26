import {Methods, OptionsType} from '../types';
import {queryStringify, generateApiUrl} from '../utils';

export type ResponseType<T = any> = {
  items: T | {reason: string} | string;
  status: number;
};

export class HTTPTransport {
  private static _instance: HTTPTransport;

  constructor() {
    if (HTTPTransport._instance) {
      return HTTPTransport._instance;
    }

    return (HTTPTransport._instance = this);
  }

  get = <T = any>(url: string, options?: OptionsType) => {
    return this.request<T>(
      url,
      {...options, method: Methods.Get},
      options?.timeout
    );
  };

  put = <T = any>(url: string, options?: OptionsType) => {
    return this.request<T>(
      url,
      {...options, method: Methods.Put},
      options?.timeout
    );
  };

  post = <T = any>(url: string, options?: OptionsType) => {
    return this.request<T>(
      url,
      {...options, method: Methods.Post},
      options?.timeout
    );
  };

  delete = <T = any>(url: string, options?: OptionsType) => {
    return this.request<T>(
      url,
      {...options, method: Methods.Delete},
      options?.timeout
    );
  };

  request = <T>(
    url: string,
    options?: OptionsType,
    timeout = 5000,
    apiVersion?: number
  ) => {
    const {headers = {}, method, parametrs, body, withFiles} = options || {};

    if (!headers['Content-Type'] && !withFiles) {
      headers['Content-Type'] = 'application/json';
    }

    return new Promise<ResponseType<T>>((resolve, reject) => {
      const methodType = method || 'GET';

      const xhr = new XMLHttpRequest();

      const apiUrl = generateApiUrl(url, apiVersion);

      xhr.open(methodType, `${apiUrl}${queryStringify(parametrs)}`);
      xhr.withCredentials = true;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        let data = xhr?.responseText;
        try {
          data = JSON.parse(data);
          // eslint-disable-next-line no-empty
        } catch {}
        const response: ResponseType<T> = {
          items: data,
          status: xhr.status,
        };
        resolve(response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (body) {
        if (withFiles) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xhr.send(body);
        } else {
          xhr.send(JSON.stringify(body));
        }
      } else {
        xhr.send();
      }
    });
  };
}
