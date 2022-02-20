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
  body?: {[key: string]: FormDataEntryValue | string};
};

export class HTTPTransport {
  private static _instance: HTTPTransport;

  constructor() {
    if (HTTPTransport._instance) {
      return HTTPTransport._instance;
    }

    return (HTTPTransport._instance = this);
  }

  get = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      {...options, method: Methods.Get},
      options?.timeout
    );
  };

  put = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      {...options, method: Methods.Put},
      options?.timeout
    );
  };

  post = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      {...options, method: Methods.Post},
      options?.timeout
    );
  };

  delete = (url: string, options?: OptionsType) => {
    return this.request(
      url,
      {...options, method: Methods.Delete},
      options?.timeout
    );
  };

  request = (
    url: string,
    options?: OptionsType,
    timeout = 5000,
    apiVersion?: number
  ) => {
    const {headers = {}, method, parametrs, body} = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
      const methodType = method || 'GET';

      const xhr = new XMLHttpRequest();

      const apiUrl = generateApiUrl(url, apiVersion);
      xhr.open(methodType, `${apiUrl}${queryStringify(parametrs)}`);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (body) {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  };
}
