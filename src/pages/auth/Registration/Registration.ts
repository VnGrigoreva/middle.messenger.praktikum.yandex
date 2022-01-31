import template from './template';
import { Input, Block, Link } from '../../../components';
import { compile } from '../../../utils';
import { Mediator } from '../../../modules/mediator';
import { HTMLElementEvent } from '../../../types';

export class Registration extends Block {
  //создать объект полной модели данных
  password = '';

  constructor() {
    super({}, 'div', 'authorization');
  }
//задать maxlength	<input type="text" maxlength="число"> для инпутов
//сравниватть пароли тут
//может валидаторы будут возвращать текст ошибки а не тру/фолс?
  render() {
    const inputEmail = new Input({
      label: 'Почта',
      id: 'email',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputEmail.setProps({
            error: undefined,
            value: event.target.value,
          });
          if (!Mediator.Instance.validateEmail(event.target.value)) {
            inputEmail.setProps({
              error: 'Почта не валидна',
              value: event.target.value,
            });
          }
        },
      }
    });
    const inputLogin = new Input({ label: 'Логин', id: 'login', autocomplete: 'username' });
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
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          this.password = event.target.value;
        },
      },
    });
    const inputVerifyPassword = new Input({
      label: 'Пароль (еще раз)',
      id: 'verify_password',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputVerifyPassword.setProps({
            error: undefined,
            value: event.target.value,
          });
          if (!Mediator.Instance.validatePassword(event.target.value)) {
            inputVerifyPassword.setProps({
              error: 'Пароль не валидный',
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
      //добавить событие онклика для сабмита
    });
  }
}
