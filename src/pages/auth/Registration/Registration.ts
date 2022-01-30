import template from './template';
import { Input, Block, Link } from '../../../components';
import compile from '../../../utils/compile';

export class Registration extends Block {
  constructor() {
    super({}, 'div', 'authorization');
  }

  render() {
    const inputEmail = new Input({
      label: 'Почта',
      id: 'email',
      error: 'Почта не валидна',
    });
    const inputLogin = new Input({ label: 'Логин', id: 'login' });
    const inputFirstName = new Input({ label: 'Имя', id: 'first_name' });
    const inputSecondName = new Input({ label: 'Фамилия', id: 'second_name' });
    const inputPhone = new Input({
      label: 'Телефон',
      id: 'phone',
      type: 'tel',
      error: 'Телефон не валидный',
      pattern: '(\\+[0-9]|[0-9])([0-9]{10})',
    });
    const inputPassword = new Input({
      label: 'Пароль',
      id: 'password',
      type: 'password',
      //onkeypress: handleKeypress(),
    });
    const inputVerifyPassword = new Input({
      label: 'Пароль (еще раз)',
      id: 'verify_password',
      type: 'password',
      //onkeypress: handleKeypress(),
      error: 'Пароли не совпадают',
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
