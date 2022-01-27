import {EventBus} from '../../modules';
import {CallbackType} from '../../modules/eventBus/eventBus';

export type PropsType = {[key: string]: unknown};

export enum Events {
  init = 'init',
  cdm = 'flow:component-did-mount',
  cdu = 'flow:component-did-update',
  render = 'flow:render',
}

export class Block<TProps extends PropsType> {
  static EVENTS = {
    INIT: Events.init,
    FLOW_CDM: Events.cdm,
    FLOW_RENDER: Events.render,
    FLOW_CDU: Events.cdm,
  };

  _meta: {
    props: TProps,
  };
  _element: HTMLElement | null = null;
  props: TProps;
  eventBus:() => EventBus;

  /** JSDoc
   * @param {string} template
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props = {} as TProps) {
    const eventBus = new EventBus();

    this._meta = {
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
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as CallbackType);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    if (!this._element) {
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

  setProps = (nextProps: TProps) => {
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
    const result = this._createDocumentElement(template);
    if (!this._element) {
      this._element = result;
    } else {
      this._element.innerHTML = result.innerHTML;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(): string {return ""}

  getContent() {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: TProps) {
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
        if (prop.indexOf('_') === 0) {
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

  _createDocumentElement(template: string) {
    console.log(template);
    const domParser = new DOMParser();
    return domParser.parseFromString(template, 'text/html').body.childNodes[0] as HTMLElement;
  }

  show() {
    if (this.element) {
      this.element.setAttribute('style','display: block');
    }
  }

  hide() {
    if (this.element) {
      this.element.setAttribute('style','display: none');
    }
  }
}
