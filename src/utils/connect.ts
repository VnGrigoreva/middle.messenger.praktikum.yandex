import {Block} from '../components';
import store, {StoreEvents} from '../modules/store';
import {Indexed} from '../types';

export function connect(
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) {
  // используем class expression
  return class extends Component {
    constructor(props = {}) {
      super({...props, ...mapStateToProps(store.getState())});

      store.on(StoreEvents.Updated, () => {
        this.setProps({...mapStateToProps(store.getState())});
      });
    }
  };
}
