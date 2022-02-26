export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type EventsType = Record<
  string,
  | ((event: HTMLElementEvent<any>) => void)
  | {selector: string; handler: (event: HTMLElementEvent<any>) => void}
>;

export type CallbackType = (...args: unknown[]) => void;

export enum Routes {
  Login = '/',
  Chat = '/messenger',
  PasswordEditing = '/changePassword',
  Registration = '/sign-up',
  Profile = '/profile',
  Settings = '/settings',
}

export type Indexed<T = any> = {
  [key in string]: T;
};

//form
export type FromEntriesType = {
  [k: string]: FormDataEntryValue;
};

//api
export type OptionsType = {
  timeout?: number;
  method?: Methods;
  headers?: {
    'Content-Type'?: string;
  };
  parametrs?: {[key: string]: string};
  body?: {[key: string]: FormDataEntryValue | string} | FormData;
  withFiles?: boolean;
};

export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE',
}
