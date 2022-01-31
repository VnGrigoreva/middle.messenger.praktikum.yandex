import { EventBus } from '../../modules';
import { CallbackType } from '../../modules/eventBus/eventBus';
import { nanoid } from 'nanoid';

export type PropsType = { [key: string]: any };

export enum Events {
  init = 'init',
  cdm = 'flow:component-did-mount',
  cdu = 'flow:component-did-update',
  render = 'flow:render',
}

export class Block<TProps extends PropsType = any> {
  static EVENTS = {
    INIT: Events.init,
    FLOW_CDM: Events.cdm,
    FLOW_RENDER: Events.render,
    FLOW_CDU: Events.cdm,
  };

  _meta: {
    props: TProps;
    tagName: string;
    className?: string;
  };
  _element: HTMLElement | null = null;
  props: TProps;
  eventBus: () => EventBus;
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

  _registerEvents(eventBus: EventBus) {
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

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount(oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this._componentDidMount();
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (oldProps !== newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  setProps = (nextProps: Partial<TProps>) => {
  console.log('setProps', nextProps);
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

    this.props = this._makePropsProxy({ ...newProps, ...nextProps });
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  get element() {
    return this._element;
  }

  _render() {
    const template = this.render();

    this._removeEvents();
    this._element!.innerHTML = '';
    // const result = this._createDocumentElement(template);
    // if (!this._element) {
    //   this._element = template as unknown as HTMLElement;
    // } else {
    //   this._element.innerHTML = (template as unknown as HTMLElement)?.innerHTML;
    // }

    this._element!.appendChild(template);
    this._addEvents();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // render(): string {
  //   return '';
  // }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this._element as HTMLElement;
  }

  _makePropsProxy(props: TProps) {
    const newProps = { ...props };
    for (const key in props) {
      if (key.indexOf('_') !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newProps['_' + key] = props[key];
      }
    }
    const proxyData = new Proxy(newProps, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          return target[prop];
          throw new Error('Отказано в доступе');
        }
        const value = target['_' + prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
    return proxyData;
  }

  _createDocumentElement() {
    const {tagName, className} = this._meta;
    const result = document.createElement(tagName);
    if (className) {
      result.className = className;
    }
    return result;
  }

  show() {
    if (this.element) {
      this.element.setAttribute('style', 'display: block');
    }
  }

  hide() {
    if (this.element) {
      this.element.setAttribute('style', 'display: none');
    }
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }
}
