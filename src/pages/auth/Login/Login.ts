import { Block } from '../../../components/Block/Block';
import template from './template';
import { Input } from '../../../components/Input/Input';
import { compile } from '../../../utils';
import { HTMLElementEvent } from '../../../types';
import { Mediator } from '../../../modules/mediator';

export class Login extends Block {
  constructor() {
    super({}, 'div', 'authorization');
  }

  componentDidMount(): void {
    const handleSubmit = (event: HTMLElementEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const fromEntries = Object.fromEntries(formData);
      const {login, password} = fromEntries;

      if (login && !Mediator.Instance.validateLogin(login as string) && password) {
        console.log(fromEntries);
      }

      return false;
    };

    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: handleSubmit
        },
      }
    });
  }

  render() {
    const inputLogin = new Input({
      label: 'Логин',
      id: 'login',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputLogin.setProps({
            error: Mediator.Instance.validateLogin(event.target.value),
            value: event.target.value,
          });
        },
      }
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
