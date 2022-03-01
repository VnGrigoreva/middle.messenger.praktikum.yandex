import {EventBus} from '../../modules';
import {nanoid} from 'nanoid';
import {CallbackType, EventsType} from '../../types';

export type PropsType = {[key: string]: any};

export enum Events {
  Init = 'init',
  Cdm = 'flow:component-did-mount',
  Cdu = 'flow:component-did-update',
  Render = 'flow:render',
}

export class Block<TProps extends PropsType = any> {
  private static EVENTS = {
    INIT: Events.Init,
    FLOW_CDM: Events.Cdm,
    FLOW_RENDER: Events.Render,
    FLOW_CDU: Events.Cdu,
  };

  private _meta: {
    props: TProps;
    tagName: string;
    className?: string;
  };
  private _element: HTMLElement | null = null;
  protected props: TProps;
  private eventBus: () => EventBus;
  public id = nanoid(6);

  /** JSDoc
   * @param {string} template
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props = {} as TProps, tagName = 'div', className?: string) {
    const eventBus = new EventBus();

    this._meta = {
      className,
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as CallbackType
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    if (!this._element) {
      this._element = this._createDocumentElement();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount(oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (oldProps !== newProps) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  setProps = (nextProps: Partial<TProps>) => {
    if (!nextProps) {
      return;
    }
    const oldProps = this.props;
    const newProps = {} as TProps;
    for (const key in this.props) {
      if (key.indexOf('_') !== 0) {
        newProps[key] = this.props[key];
      }
    }

    this.props = this._makePropsProxy({...newProps, ...nextProps});
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const template = this.render();

    this._removeEvents();
    this._element!.innerHTML = '';

    this._element!.appendChild(template);
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this._element as HTMLElement;
  }

  private _makePropsProxy(props: TProps) {
    const newProps = {...props};
    for (const key in props) {
      if (key.indexOf('_') !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newProps['_' + key] = props[key];
      }
    }
    const proxyData = new Proxy(newProps, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
    return proxyData;
  }

  private _createDocumentElement() {
    const {tagName, className} = this._meta;
    const result = document.createElement(tagName);
    if (className) {
      result.className = className;
    }
    return result;
  }

  show() {
    if (this.element) {
      this.element.setAttribute('style', 'display: flex');
    }
  }

  hide() {
    if (this.element) {
      this.element.setAttribute('style', 'display: none');
    }
  }

  private _addEvents() {
    const events: EventsType = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (typeof listener === 'object') {
        const target = this._element?.querySelector(listener.selector);
        target?.addEventListener(event, listener.handler);
      } else {
        this._element?.addEventListener(event, listener);
      }
    });
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }
}
