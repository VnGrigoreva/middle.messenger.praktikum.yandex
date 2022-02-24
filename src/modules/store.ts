import {EventBus} from './eventBus';
import {Indexed} from '../types';
import {set} from '../utils';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
  }

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
