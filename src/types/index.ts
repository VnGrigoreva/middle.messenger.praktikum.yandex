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
  body?:
    | {[key: string]: FormDataEntryValue | string | number}
    | XMLHttpRequestBodyInit;
  withFiles?: boolean;
};

export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE',
}

export type ChatItemType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserItemType;
    time: string;
    content: string;
  };
};

export type UserItemType = {
  id?: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type MessageType = {
  content: string;
  user_id: number;
};

export type sessionType = {
  socket: WebSocket | null;
  chatId: number;
  messages: MessageType[];
};

export type StoreType = {
  chat: {
    activeChat: number;
    data: ChatItemType[];
    isLoading?: boolean;
    error?: string;
    sessions: sessionType[];
  };
  user: {
    data: UserItemType;
    isLoading?: boolean;
    error?: string;
  };
  auth: {
    isLoading?: boolean;
    error?: string;
    success?: string;
  };
};

export type DeleteChatParamsType = {
  chatId: number;
};
