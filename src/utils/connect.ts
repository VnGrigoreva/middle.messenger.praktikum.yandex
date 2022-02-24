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
      // не забываем передать все аргументы конструктора
      super({...props, ...mapStateToProps(store.getState())});

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({...mapStateToProps(store.getState())});
      });
    }
  };
}
