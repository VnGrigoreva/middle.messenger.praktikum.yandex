import template from './template';
import { Input, Block, Link } from '../../../components';
import { compile } from '../../../utils';
import { Mediator } from '../../../modules/mediator';

export class Registration extends Block {
  password = '';

  constructor() {
    super({}, 'div', 'authorization');
  }

  render() {
    const inputEmail = new Input({
      label: 'Почта',
      id: 'email',
    });
    const inputLogin = new Input({ label: 'Логин', id: 'login' });
    const inputFirstName = new Input({ label: 'Имя', id: 'first_name' });
    const inputSecondName = new Input({ label: 'Фамилия', id: 'second_name' });
    const inputPhone = new Input({
      label: 'Телефон',
      id: 'phone',
      type: 'tel',
      pattern: '(\\+[0-9]|[0-9])([0-9]{10})',
    });
    const inputPassword = new Input({
      label: 'Пароль',
      id: 'password',
      type: 'password',
      autocomplete: 'new-password',
      events: {
        change: (event) => {
          this.password = event.target.value;
        },
      },
    });
    const inputVerifyPassword = new Input({
      label: 'Пароль (еще раз)',
      id: 'verify_password',
      type: 'password',
      events: {
        change: (event) => {
          console.log(this.password, event.target.value);
          if (
            !Mediator.Instance.validatePassword(
              this.password,
              event.target.value
            )
          ) {
            inputVerifyPassword.setProps({
              error: 'Пароли не совпадают',
              value: event.target.value,
            });
          }
        },
      },
    });
    const entryLink = new Link({
      label: 'Войти',
      path: '/',
      mode: 'primary',
    });

    return compile(template, {
      email: inputEmail,
      login: inputLogin,
      firstName: inputFirstName,
      secondName: inputSecondName,
      phone: inputPhone,
      password: inputPassword,
      verifyPassword: inputVerifyPassword,
      entry: entryLink,
    });
  }
}
