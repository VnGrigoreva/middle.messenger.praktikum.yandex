import { Block } from '../../../components/Block/Block';
import template from './template';
import { Input } from '../../../components/Input/Input';
import { compile } from '../../../utils';

export class Login extends Block {
  constructor() {
    super({}, 'div', 'authorization');
  }

  render() {
    const inputLogin = new Input({
      label: 'Логин',
      id: 'login',
      events: {
        click: (event) => console.log(event.target.value),
      },
    });
    const inputPas = new Input({
      label: 'Пароль',
      id: 'password',
      type: 'password',
    });

    return compile(template, {
      login: inputLogin,
      password: inputPas,
    });
  }
}
