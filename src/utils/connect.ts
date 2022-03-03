import {Block} from '../components';
import store, {StoreEvents} from '../modules/store';
import {StoreType} from '../types';

export function connect<T>(
  Component: {new (props: T): Block<T>},
  mapStateToProps: (state: StoreType) => any
) {
  return class extends Component {
    constructor(props = {}) {
      super({...props, ...mapStateToProps(store.getState())});

      store.on(StoreEvents.Updated, () => {
        this.setProps({...mapStateToProps(store.getState())});
      });
    }
  };
}
