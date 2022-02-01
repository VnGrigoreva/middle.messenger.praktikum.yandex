export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

export type EventsType = Record<
  string,
  | ((event: HTMLElementEvent<any>) => void)
  | { selector: string; handler: (event: HTMLElementEvent<any>) => void }
>;