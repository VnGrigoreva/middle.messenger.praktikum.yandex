import {Block, Input, Link} from '../../../components';
import template from './template';
import {compile} from '../../../utils';
import {HTMLElementEvent, Routes} from '../../../types';
import {Mediator} from '../../../modules';
import {Router} from '../../../modules';

export class Login extends Block {
  constructor() {
    super({}, 'div', 'authorization');
  }

  private handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {login, password} = fromEntries;

    if (
      login &&
      !Mediator.Instance.validateLogin(login as string) &&
      password
    ) {
      console.warn(fromEntries);

      const router = new Router('.app');
      router.go(Routes.Chat);
    }
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit,
        },
      },
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
      },
    });
    const inputPas = new Input({
      label: 'Пароль',
      id: 'password',
      type: 'password',
    });
    const registrationLink = new Link({
      label: 'Нет аккаунта',
      path: Routes.Registration,
      mode: 'primary',
      className: 'link',
    });

    return compile(template, {
      login: inputLogin,
      password: inputPas,
      registration: registrationLink,
    });
  }
}
