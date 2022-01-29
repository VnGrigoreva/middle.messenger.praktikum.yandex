import { Block } from '../Block/Block';
import template from './template';
import { Input } from '../Input/Input';
import compile from '../../utils/compile';

export class Form extends Block {
  constructor(props?: any) {
    super(props, 'div', 'authorization');
  }

  render() {
    const inputLogin = new Input({
      label: 'Логин',
      id: 'login',
      error: 'error',
      events: {
        input: (event) => console.log(event.target.value),
      },
    });
    const inputPas = new Input({ label: 'Пароль', id: 'password' });

    // setTimeout(() => {
    //   inputLogin.setProps({
    //     label: 'Hello mazafacker, please',
    //     id: 'login'
    //   });
    // }, 2000);

    return compile(template, {
      login: inputLogin,
      password: inputPas
    });
  }
}
