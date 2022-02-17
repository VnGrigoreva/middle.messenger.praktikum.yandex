export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type EventsType = Record<
  string,
  | ((event: HTMLElementEvent<any>) => void)
  | { selector: string; handler: (event: HTMLElementEvent<any>) => void }
>;

export type CallbackType = (...args: unknown[]) => void;

export enum Routes {
  Login = '/',
  Chat = '/messenger',
  PasswordEditing = '/changePassword',
  Registration = '/sign-up',
  Profile = '/settings',
}
