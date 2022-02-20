import {queryStringify, generateApiUrl} from '../utils';

export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE',
}

export type OptionsType = {
  timeout?: number;
  method?: Methods;
  headers?: {
    'Content-Type'?: string;
  };
  parametrs?: {[key: string]: string};
  body?: {[key: string]: FormDataEntryValue | string | FormData};
  withFiles?: boolean;
};

export type ResponseType<T = any> = {
  data: T | {reason: string} | string;
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
          data,
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
