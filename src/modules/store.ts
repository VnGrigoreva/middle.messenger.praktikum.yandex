import {EventBus} from './eventBus';
import {Indexed, StoreType} from '../types';
import {set} from '../utils';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: StoreType = {} as StoreType;

  constructor() {
    super();
  }

  getState() {
    return this.state as StoreType;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
